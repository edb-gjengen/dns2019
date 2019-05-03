import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { graphql, Link } from 'gatsby'
import Layout from '../components/Layout'
import Img from 'gatsby-image'

import moment from 'moment'
import 'moment/locale/nb'
moment.locale('nb')

export const BlogPostTemplate = ({
  content,
  categories,
  tags,
  title,
  date,
  author,
  featuredMedia,
}) => {
  const hasFeaturedMedia = featuredMedia && !!featuredMedia.localFile
  return (
    <section
      className={`post-page ${
        hasFeaturedMedia ? 'has-featured-media' : 'no-featured-media'
      }`}
    >
      <div className="post-hero">
        <div className="post-hero_text">
          <h1>{title}</h1>
          <div className="post-meta">
            <p>
              {moment(date).format('dddd D. MMMM YYYY')} av{' '}
              <Link to={`/author/${author.slug}`}>{author.name}</Link>
            </p>
          </div>
        </div>
        {hasFeaturedMedia && (
          <div className="post-hero_image">
            <Img fluid={featuredMedia.localFile.childImageSharp.fluid} />
          </div>
        )}
      </div>
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
}

const BlogPost = ({ data }) => {
  const { wordpressPost: post } = data

  return (
    <Layout>
      <Helmet title={`${post.title} | Blog`} />
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
        localFile {
          ...FluidImage
        }
      }
    }
  }
`
