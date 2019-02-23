import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { graphql, Link } from 'gatsby'
import Layout from '../components/Layout'
import Img from 'gatsby-image'

export const BlogPostTemplate = ({
  content,
  categories,
  tags,
  title,
  date,
  author,
  hasFeaturedMedia,
  featuredMedia,
}) => {
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
              {date} av <Link to={`/author/${author.slug}`}>{author.name}</Link>
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
        className="post-content"
        dangerouslySetInnerHTML={{ __html: content }}
      />
      {categories && categories.length ? (
        <div>
          <h4>Categories</h4>
          <ul className="taglist">
            {categories.map(category => (
              <li key={`${category.slug}cat`}>
                <Link to={`/categories/${category.slug}/`}>
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
      {tags && tags.length ? (
        <div>
          <h4>Tags</h4>
          <ul className="taglist">
            {tags.map(tag => (
              <li key={`${tag.slug}tag`}>
                <Link to={`/tags/${tag.slug}/`}>{tag.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
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
        hasFeaturedMedia={!!post.featured_media.localFile}
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
    date(formatString: "MMMM DD, YYYY")
    title
  }
  query BlogPostByID($id: String!) {
    wordpressPost(id: { eq: $id }) {
      id
      title
      slug
      content
      date(formatString: "MMMM DD, YYYY")
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
