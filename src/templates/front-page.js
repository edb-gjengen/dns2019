import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import PostList from '../components/PostList'
import EventList from '../components/EventList'

export default class IndexPage extends React.Component {
  render() {
    const { data } = this.props
    const { edges: events } = data.allWordpressWpEvents
    const { edges: posts } = data.allWordpressPost

    return (
      <Layout>
        <EventList events={events} numDays={7} groupBy="day" />
        <div className="volunteer">Bli frivillig!</div>
        <PostList posts={posts} title="Aktuelt" />
      </Layout>
    )
  }
}

IndexPage.propTypes = {
  data: PropTypes.shape({
    allWordpressPost: PropTypes.shape({
      edges: PropTypes.array,
    }),
    allWordpressWpEvents: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
}

export const pageQuery = graphql`
  query {
    allWordpressWpEvents(sort: { fields: start_time, order: ASC }) {
      edges {
        node {
          ...EventListFields
        }
      }
    }
    allWordpressPost(sort: { fields: date, order: DESC }, limit: 4) {
      edges {
        node {
          ...PostListFields
        }
      }
    }
  }
`
