import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import moment from 'moment'
import 'moment/locale/nb'

import Layout from '../components/Layout'
import EventList from '../components/EventList'

moment.locale('nb')

export default class EventOrganizerPage extends React.Component {
  render() {
    const { data, pageContext } = this.props
    const { edges: events, totalCount } = data.allWordpressWpEvents
    const { name, description, slug } = pageContext

    return (
      <Layout classes="organizer-page">
        <Helmet title={`${name} | Program`} />
        <EventList
          events={events}
          title={`Program for ${name}`}
          groupBy="month"
          filterOrganizer={slug}
          showFilter
        />
        {/* <section className="event-organizer-page">
          <h1 className="page-title">{name}</h1>
          <div
            className="event-organizer-description wp-content"
            dangerouslySetInnerHTML={{ __html: description }}
          />
          <EventList events={events} title="I fremtiden" />
        </section> */}
      </Layout>
    )
  }
}

EventOrganizerPage.propTypes = {
  data: PropTypes.shape({
    allWordpressWpEventTypes: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
  pageContext: PropTypes.shape({
    name: PropTypes.string,
    slug: PropTypes.string,
    description: PropTypes.string,
  }),
}

export const pageQuery = graphql`
  query EventOrganizerPage($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    allWordpressWpEvents(
      filter: { event_organizers: { elemMatch: { slug: { eq: $slug } } } }
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
