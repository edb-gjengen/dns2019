import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'

export default class EventList extends React.Component {
  render() {
    const { events, title } = this.props

    return (
      <section className="events">
        <h1 className="section-title">{title}</h1>
        <div className="event-list">
          {events.map(({ node: event }) => (
            <Link 
              className="event-title" 
              to={event.fields.link}
              className="event"
              key={event.id}
            >
              <header className="event-header">
                <h2 className="event-title">
                  {event.title}
                </h2>
                <div className="event-meta">
                  {event.start_time}&mdash;{event.end_time}
                </div>
              </header>
            </Link>
          ))}
        </div>
      </section>
    )
  }
}

EventList.propTypes = {
  events: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string,
}

export const pageQuery = graphql`
  fragment EventListFields on wordpress__wp_events {
    id
    title
    start_time(formatString: "MMMM DD, YYYY")
    end_time(formatString: "MMMM DD, YYYY")
    fields {
      link
    }
  }
`
