import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { graphql, Link } from 'gatsby'
import Img from 'gatsby-image'
import moment from 'moment'
import 'moment/locale/nb'
import Layout from '../components/Layout'

moment.locale('nb')

export const BlogPostTemplate = ({
  content,
  // categories,
  // tags,
  title,
  date,
  author,
  featuredMedia,
}) => {
  const hasFeaturedMedia =
    featuredMedia && (!!featuredMedia.localFile || !!featuredMedia.url)
  return (
    <section
      className={`post-page ${
        hasFeaturedMedia ? 'has-featured-media' : 'no-featured-media'
      }`}
    >
      <div className="post-hero">
        <div className="post-hero-inner">
          <div className="post-hero_text">
            <h1>{title}</h1>
            <div className="post-meta">
              <p>
                {moment(date).format('dddd D. MMMM YYYY')} av{' '}
                <Link to={`/author/${author.slug}`}>{author.name}</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
      {hasFeaturedMedia && (
        <>
          <div className="post-hero_image">
            {featuredMedia.localFile.childImageSharp ? (
              <Img fluid={featuredMedia.localFile.childImageSharp.fluid} />
            ) : (
              <img
                src={featuredMedia.localFile.url}
                alt={featuredMedia.caption || ''}
              />
            )}
            {featuredMedia.caption && (
              <div
                className="post-hero_image-caption"
                dangerouslySetInnerHTML={{ __html: featuredMedia.caption }}
              />
            )}
          </div>
        </>
      )}
      <div
        className="post-content wp-content"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </section>
  )
}

BlogPostTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  title: PropTypes.string,
  date: PropTypes.string.isRequired,
  featuredMedia: PropTypes.shape({
    caption: PropTypes.string,
  }),
  author: PropTypes.shape({
    name: PropTypes.string,
    slug: PropTypes.string,
  }),
}

const BlogPost = ({ data }) => {
  const { wordpressPost: post } = data

  return (
    <Layout>
      <Helmet title={`${post.title} | Nyheter`} />
      <BlogPostTemplate
        content={post.content}
        categories={post.categories}
        tags={post.tags}
        title={post.title}
        date={post.date}
        author={post.author}
        featuredMedia={post.featured_media}
      />
    </Layout>
  )
}

BlogPost.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
}

export default BlogPost

export const pageQuery = graphql`
  fragment FluidImage on File {
    childImageSharp {
      fluid(maxWidth: 800) {
        ...GatsbyImageSharpFluid
      }
    }
    url
  }
  fragment PostFields on wordpress__POST {
    id
    slug
    content
    date
    title
  }
  query BlogPostByID($id: String!) {
    wordpressPost(id: { eq: $id }) {
      id
      title
      slug
      content
      date
      categories {
        name
        slug
      }
      tags {
        name
        slug
      }
      author {
        name
        slug
      }
      featured_media {
        caption
        localFile {
          ...FluidImage
        }
      }
    }
  }
`
