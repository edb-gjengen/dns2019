import React from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import PostList from '../components/PostList'

const Category = props => {
  const { data, pageContext } = props
  const { edges: posts, totalCount } = data.allWordpressPost
  const { name: category } = pageContext
  const title = `${totalCount} post${
    totalCount === 1 ? '' : 's'
  } in the “${category}” category`

  return (
    <Layout>
      <Helmet title={category} />
      <PostList posts={posts} title={title} />
    </Layout>
  )
}

export default Category

export const pageQuery = graphql`
  query CategoryPage($slug: String!) {
    allWordpressPost(
      filter: { categories: { elemMatch: { slug: { eq: $slug } } } }
    ) {
      totalCount
      edges {
        node {
          ...PostListFields
        }
      }
    }
  }
`
