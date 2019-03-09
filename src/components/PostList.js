import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'
import Img from 'gatsby-image'

export default class PostList extends React.Component {
  render() {
    const { posts, title } = this.props

    return (
      <section className="blog">
        <h1 className="section-title">{title}</h1>
        <div className="post-list">
          {posts.map(({ node: post }) => (
            <Link to={post.path} className="post" key={post.id}>
              {post.featured_media && post.featured_media.localFile && (
                <div className="post-image">
                  <Img
                    fluid={post.featured_media.localFile.childImageSharp.fluid}
                  />
                </div>
              )}
              <div className="post-text">
                <header className="post-header">
                  <h2 className="post-title">{post.title}</h2>
                  {/*<div className="post-meta">{post.date}</div>*/}
                </header>
                <div className="post-body">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: post.excerpt.replace(/<p class="link-more.*/, ''),
                    }}
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    )
  }
}

PostList.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string,
}

export const pageQuery = graphql`
  fragment PostListImage on File {
    childImageSharp {
      fluid(maxWidth: 800, maxHeight: 600) {
        ...GatsbyImageSharpFluid
      }
    }
  }
  fragment PostListFields on wordpress__POST {
    id
    path
    title
    excerpt
    author {
      name
      slug
      avatar_urls {
        wordpress_48
      }
    }
    date(formatString: "MMMM DD, YYYY")
    featured_media {
      localFile {
        ...PostListImage
      }
    }
  }
`
