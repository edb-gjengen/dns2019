import React from 'react'
import PropTypes from 'prop-types'
import { graphql, Link } from 'gatsby'

import Meta from '../components/Meta'
import Layout from '../components/Layout'
import EventList from '../components/EventList'

export default class EventOrganizerPage extends React.Component {
  render() {
    const { data, pageContext } = this.props
    const { edges: events, totalCount } = data.allWordpressWpEvents
    const { name, description, slug, association } = pageContext

    return (
      <Layout classes="event-organizer-page">
        <Meta title={`${name} | Program`} />
        <EventList
          events={events}
          preTitle="Program"
          title={name}
          groupBy="month"
          filterOrganizer={slug}
          showFilter
        >
          <div className="event-organizer-info">
            <div
              className="event-organizer-description"
              dangerouslySetInnerHTML={{ __html: description }}
            />
            {association && (
              <div className="event-organizer-read-more">
                <Link to={association.path}>Les mer om {name}</Link>
              </div>
            )}
          </div>
        </EventList>
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
    association: PropTypes.shape({}),
  }),
}

export const pageQuery = graphql`
  query EventOrganizerPage($slug: String!, $after: Date!) {
    allWordpressWpEvents(
      filter: {
        event_organizers: { elemMatch: { slug: { eq: $slug } } }
        start_time: { gt: $after }
      }
      sort: { fields: start_time, order: ASC }
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
