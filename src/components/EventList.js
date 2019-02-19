import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'
import Img from 'gatsby-image'

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
                <div className="event-image">
                  {event.featured_media && event.featured_media.localFile &&
                    <Img fluid={event.featured_media.localFile.childImageSharp.fluid} />}
                </div>
                <div className="event-meta">
                  <span class="event-start">18:00</span>
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
