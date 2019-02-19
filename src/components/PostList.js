import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'

export default class IndexPage extends React.Component {
  render() {
    const { posts, title } = this.props

    return (
      <section className="blog">
        <h1 className="section-title">{title}</h1>
        <div className="post-list">
          {posts.map(({ node: post }) => (
            <div
              className="post"
              key={post.id}
            >
              <img className="post-image" src="https://studentersamfundet.no/wp-content/uploads/2018/10/Fjor%C3%A5rets-festival_Fotograf-Karin-Kaczykowski-i-Studentenes-Fotoklubb-1280x720.jpg" />
              <div className="post-text">
                <header className="post-header">
                  <Link className="post-title" to={post.fields.link}>
                    {post.title}
                  </Link>
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
            </div>
          ))}
        </div>
      </section>
    )
  }
}

IndexPage.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string,
}

export const pageQuery = graphql`
  fragment PostListFields on wordpress__POST {
    id
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
    fields {
      link
    }
  }
`
