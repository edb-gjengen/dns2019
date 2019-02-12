import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'

export default class EventList extends React.Component {
  render() {
    const { events, title } = this.props

    return (
      <section className="event-something">
        <h1 className="section-title">{title}</h1>
        <div className="event-list">
          {events.map(({ node: event }) => (
            <div
              className="event"
              key={event.id}
            >
              <header className="post-header">
                <Link className="event-title" to={event.fields.link}>
                  {event.title}
                </Link>
                <div className="event-meta">
                  <div>Start: {event.start_time}</div>
                  <div>Slutt: {event.end_time}</div>
                </div>
              </header>
            </div>
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
