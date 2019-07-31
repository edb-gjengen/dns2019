import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import EventList from '../components/EventList'
import moment from 'moment'
import 'moment/locale/nb'

moment.locale('nb')

export default class EventOrganizerPage extends React.Component {
  render() {
    const { data, pageContext } = this.props
    const { edges: events, totalCount } = data.allWordpressWpEvents
    const { name, description } = pageContext

    const future = events.filter(({ node: event }) => {
      const startTime = moment(event.start_time)
      return !!startTime.isSameOrAfter(new Date(), 'day')
    })
    const past = events.filter(({ node: event }) => {
      const startTime = moment(event.start_time)
      return !startTime.isSameOrAfter(new Date(), 'day')
    })

    return (
      <Layout>
        <Helmet title={`Arrangør: ${name}`} />
        <section className="event-organizer-page">
          <h1 className="page-title">{name}</h1>
          <div
            className="event-organizer-description wp-content"
            dangerouslySetInnerHTML={{ __html: description }}
          />
          {future.length !== 0 && (
            <EventList
              events={future}
              onlyUpcoming={false}
              title="I fremtiden"
            />
          )}
          {past.length !== 0 && (
            <EventList events={past} onlyUpcoming={false} title="I fortiden" />
          )}
        </section>
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
