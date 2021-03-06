import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Meta from '../components/Meta'
import Layout from '../components/Layout'
import PostList from '../components/PostList'
import Pagination from '../components/Pagination'

export default class BlogPage extends React.Component {
  render() {
    const { data, pageContext } = this.props
    const { edges: posts } = data.allWordpressPost

    return (
      <Layout>
        <Meta title="Nyheter" />
        <PostList posts={posts} title="Nyheter" />
        <Pagination pageContext={pageContext} pathPrefix="/" />
      </Layout>
    )
  }
}

BlogPage.propTypes = {
  data: PropTypes.shape({
    allWordpressPost: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
  pageContext: PropTypes.shape({
    currentPage: PropTypes.number,
    numPages: PropTypes.number,
  }),
}

export const pageQuery = graphql`
  query BlogQuery($limit: Int!, $skip: Int!) {
    allWordpressPost(
      sort: { fields: date, order: DESC }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          ...PostListFields
        }
      }
    }
  }
`
