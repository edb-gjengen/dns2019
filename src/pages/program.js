import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import EventList from '../components/EventList'

export default class EventProgram extends React.Component {
  render() {
    const { data } = this.props
    const { edges: events } = data.allWordpressWpEvents

    return (
      <Layout>
        <Helmet title="Program" />
        <EventList
          events={events}
          preTitle="Program"
          title="Dette skjer på Neuf"
          groupBy="month"
          showFilter
        />
      </Layout>
    )
  }
}

EventProgram.propTypes = {
  data: PropTypes.shape({
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
  }
`
