import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import EventList from '../components/EventList'

export default class EventTypeProgram extends React.Component {
  render() {
    const { data, pageContext } = this.props
    const { edges: events, totalCount } = data.allWordpressWpEvents
    const { name: eventTypeName } = pageContext

    return (
      <Layout>
        <Helmet title={`Konsept: ${eventTypeName}`} />
        <EventList events={events} title={eventTypeName} />
      </Layout>
    )
  }
}

EventTypeProgram.propTypes = {
  data: PropTypes.shape({
    allWordpressWpEventTypes: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
  pageContext: PropTypes.shape({}),
}

export const pageQuery = graphql`
  query EventTypeProgramPage($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    allWordpressWpEvents(
      filter: { event_types: { elemMatch: { slug: { eq: $slug } } } }
      sort: { fields: date, order: DESC }
    ) {
      totalCount
      edges {
        node {
          ...EventListFields
        }
      }
    }
  }
`
