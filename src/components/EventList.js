import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'
import Img from 'gatsby-image'

import moment from 'moment'
import 'moment/locale/nb'
moment.locale('nb')

export default class EventList extends React.Component {
  render_event(event) {
    return (
      <Link to={event.fields.link} className="event" key={event.id}>
        <div className="event-image">
          {event.featured_media && event.featured_media.localFile && (
            <Img fluid={event.featured_media.localFile.childImageSharp.fluid} />
          )}
        </div>
        <header className="event-header">
          <h2 className="event-title">{event.title}</h2>
          <div className="event-meta">
            <span className="event-start">
              {moment(event.start_time).format('HH:mm')}
            </span>
            <span className="event-date">
              <span className="event-date-weekday">
                {moment(event.start_time).format('dddd')}{' '}
              </span>
              <span className="event-date-day">
                {moment(event.start_time).format('D.')}{' '}
              </span>
              <span className="event-date-month">
                {moment(event.start_time).format('MMMM')}{' '}
              </span>
              {/* Only specify year if different. */}
              {!moment(event.start_time).isSame(new Date(), 'year') && (
                <span className="event-date-year">
                  {moment(event.start_time).format('YYYY')}{' '}
                </span>
              )}
            </span>
            {event.event_types && event.event_types.length && (
              <div className="event-types">
                <ul>
                  {event.event_types.map(type => (
                    <li key={`${type.slug}`}>
                      {type.name}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </header>
      </Link>
    )
  }

  render() {
    const { events, title } = this.props

    return (
      <section className="events">
        <h1 className="section-title">{title}</h1>
        <div className="event-list">
          {events.map(({ node: event }) => this.render_event(event))}
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
  fragment EventTypeFields on wordpress__wp_events {
    event_types {
      name
      slug
      fields {
        link
      }
    }
  }
  fragment EventListFields on wordpress__wp_events {
    id
    title
    start_time
    end_time
    featured_media {
      localFile {
        ...FluidImage
      }
    }
    fields {
      link
    }
    ...EventTypeFields
  }
`
