import React from 'react'
import { graphql } from 'gatsby'
import Meta from '../components/Meta'
import Layout from '../components/Layout'
import PostList from '../components/PostList'

const Author = props => {
  const { data } = props
  const { authored_wordpress__POST, name } = data.wordpressWpUsers
  const totalCount =
    (authored_wordpress__POST && authored_wordpress__POST.length) || 0
  const { title: siteTitle } = data.site.siteMetadata
  const title = `${totalCount} post${totalCount === 1 ? '' : 's'} by ${name}`

  // The `authored_wordpress__POST` returns a simple array instead of an array
  // of edges / nodes. We therefore need to convert the array here.
  const posts =
    totalCount === 0
      ? []
      : authored_wordpress__POST.map(post => ({
          node: post,
        }))

  return (
    <Layout>
      <Meta title={name} />
      <PostList posts={posts} title={title} />
    </Layout>
  )
}

export default Author

export const pageQuery = graphql`
  query AuthorPage($id: String!) {
    site {
      siteMetadata {
        title
      }
    }
    wordpressWpUsers(id: { eq: $id }) {
      name
      authored_wordpress__POST {
        ...PostListFields
      }
    }
  }
`
