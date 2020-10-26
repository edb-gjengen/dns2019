import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'
import Img from 'gatsby-image'

export default class PostList extends React.Component {
  render() {
    const { posts, title, showMore } = this.props

    return (
      <section className="blog">
        <h2 className="section-title">{title}</h2>
        <div className="post-list">
          {posts.map(({ node: post }) => (
            <Link
              to={post.path}
              className={`post ${
                post.featured_media && post.featured_media.localFile
                  ? 'post--with-media'
                  : 'post--no-media'
              }`}
              key={post.id}
            >
              {post.featured_media && post.featured_media.localFile && (
                <div className="post-image">
                  {post.featured_media.localFile.childImageSharp ? (
                    <Img
                      fluid={
                        post.featured_media.localFile.childImageSharp.fluid
                      }
                    />
                  ) : (
                    <img
                      src={post.featured_media.localFile.publicUrl}
                      alt={post.featured_media.caption || ''}
                    />
                  )}
                </div>
              )}
              <div className="post-text">
                <header className="post-header">
                  <h2 className="post-title">{post.title}</h2>
                  {/* <div className="post-meta">{post.date}</div> */}
                </header>
                <div className="post-body">
                  <div
                    className="wp-content"
                    dangerouslySetInnerHTML={{
                      __html: post.excerpt.replace(/<p class="link-more.*/, ''),
                    }}
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>
        {showMore && (
          <div className="show-more">
            <Link to="/nyheter/" className="button button-large">
              <span>Se alle nyheter</span>
            </Link>
          </div>
        )}
      </section>
    )
  }
}

PostList.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string,
  showMore: PropTypes.bool,
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
        publicURL
        ...PostListImage
      }
    }
  }
`
