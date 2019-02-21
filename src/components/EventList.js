import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'
import Img from 'gatsby-image'

import moment from 'moment';
import 'moment/locale/nb'
moment.locale('nb')

export default class EventList extends React.Component {
  formatDate(dt) {
    return moment(dt).format('D. MMMM')
  }

  formatTime(dt) {
    return moment(dt).format('HH:mm')
  }

  formatTimes(start, end, sep) {
    if (!end) {
      return this.formatTime(start)
    }
    return this.formatTime(start) + sep + this.formatTime(end)
  }

  render() {
    const { events, title } = this.props

    return (
      <section className="events">
        <h1 className="section-title">{title}</h1>
        <div className="event-list">
          {events.map(({ node: event }) => (
            <Link
              to={event.fields.link}
              className="event"
              key={event.id}
            >
              <div className="event-image">
                {event.featured_media && event.featured_media.localFile &&
                  <Img fluid={event.featured_media.localFile.childImageSharp.fluid} />}
              </div>
              <header className="event-header">
                <h2 className="event-title">
                  {event.title}
                </h2>
                <div className="event-meta">
                  <span class="event-start">{this.formatTime(event.start_time)}</span>
                  <span class="event-date">{this.formatDate(event.start_time)}</span>
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
  }
`
