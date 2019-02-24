import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'
import Img from 'gatsby-image'
import _ from 'lodash'

import moment from 'moment'
import 'moment/locale/nb'
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable'
moment.locale('nb')

export default class EventList extends React.Component {
  render() {
    const { events, title, onlyUpcoming, numDays, groupBy } = this.props

    const filteredEvents = events.filter(({ node: event }) => {
      const startTime = moment(event.start_time)
      if (onlyUpcoming && !startTime.isSameOrAfter(new Date(), 'day')) {
        return false
      }
      if (numDays) {
        const lastDay = moment().add(numDays - 1, 'days')
        if (!startTime.isSameOrBefore(lastDay, 'day')) {
          return false
        }
      }
      return true
    })

    return (
      <section className="events">
        {title && <h1 className="section-title">{title}</h1>}
        {groupBy && this.renderEventsByDate(filteredEvents, groupBy)}
        {!groupBy &&
          filteredEvents.map(({ node: event }) => this.renderEvent(event))}
      </section>
    )
  }

  renderEventsByDate(filteredEvents, groupBy) {
    let groupByFormat = null
    if (groupBy === 'day') {
      groupByFormat = 'YYYY-MM-DD'
    }
    if (groupBy === 'month') {
      groupByFormat = 'YYYY-MM'
    }
    const grouper = ({ node: event }) => {
      return moment(event.start_time).format(groupByFormat)
    }
    const groupedEvents = _.groupBy(filteredEvents, grouper)
    return _.map(groupedEvents, (theseEvents, date) => {
      return (
        <div className={`event-group event-grouped-by-${groupBy}`}>
          <div className="event-group-header">
            {groupBy === 'day' && moment(date).format('dddd D. MMMM')}
            {groupBy === 'month' && moment(date).format('MMMM')}
          </div>
          <div className="event-list">
            {theseEvents.map(({ node: event }) => {
              return this.renderEvent(event)
            })}
          </div>
        </div>
      )
    })
  }

  renderEvent(event) {
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
                    <li key={`${type.slug}`}>{type.name}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </header>
      </Link>
    )
  }
}

EventList.propTypes = {
  events: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string,
  onlyUpcoming: PropTypes.bool,
  numDays: PropTypes.number,
  groupBy: PropTypes.string,
}

EventList.defaultProps = {
  onlyUpcoming: true,
  numDays: 0,
  groupBy: null,
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
