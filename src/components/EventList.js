import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'
import Img from 'gatsby-image'
import classNames from 'classnames'
import _ from 'lodash'
import moment from 'moment'
import 'moment/locale/nb'

moment.locale('nb')

export default class EventList extends React.Component {
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
    const { compactDate } = this.props
    return (
      <Link to={event.path} className="event" key={event.id}>
        <div className="event-image">
          {event.featured_media && event.featured_media.localFile && (
            <Img fluid={event.featured_media.localFile.childImageSharp.fluid} />
          )}
        </div>
        <header className="event-header">
          <span
            className={`event-date ${compactDate && 'event-date-is-compact'}`}
          >
            <span className="event-date-weekday">
              {moment(event.start_time).format('dddd')}{' '}
            </span>
            {!compactDate && (
              <span className="event-date-day-month">
                {moment(event.start_time).format('D.')}{' '}
                {moment(event.start_time).format('MMMM')}{' '}
              </span>
            )}
            {compactDate && (
              <span className="event-date-day-month">
                {moment(event.start_time).format('D/M')}{' '}
              </span>
            )}
            {/* Only specify year if different. */}
            {!moment(event.start_time).isSame(new Date(), 'year') && (
              <span className="event-date-year">
                {moment(event.start_time).format('YYYY')}{' '}
              </span>
            )}
          </span>
          <h2 className="event-title">{event.title}</h2>
          <div className="event-meta">
            <span className="event-start">
              kl. {moment(event.start_time).format('HH:mm')}
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

  render() {
    const {
      events,
      title,
      classes,
      onlyUpcoming,
      maxEvents,
      groupBy,
      showMore,
    } = this.props

    let filteredEvents = events.filter(({ node: event }) => {
      const startTime = moment(event.start_time)
      if (onlyUpcoming && !startTime.isSameOrAfter(new Date(), 'day')) {
        return false
      }
      return true
    })

    if (maxEvents) {
      filteredEvents = filteredEvents.slice(0, maxEvents)
    }

    return (
      <section className={classNames("events", classes)}>
        {title && <h1 className="section-title">{title}</h1>}
        {groupBy && this.renderEventsByDate(filteredEvents, groupBy)}
        {!groupBy && (
          <div className="event-list">
            {filteredEvents.map(({ node: event }) => {
              return this.renderEvent(event)
            })}
          </div>
        )}
        {showMore && (
          <div className="show-more">
            <Link to="/program/" className="button">
              Vis alle
            </Link>
          </div>
        )}
      </section>
    )
  }
}

EventList.propTypes = {
  events: PropTypes.arrayOf(PropTypes.object),
  classes: PropTypes.string,
  title: PropTypes.string,
  onlyUpcoming: PropTypes.bool,
  maxEvents: PropTypes.number,
  groupBy: PropTypes.string,
  compactDate: PropTypes.bool,
  showMore: PropTypes.bool,
}

EventList.defaultProps = {
  onlyUpcoming: true,
  maxEvents: 0,
  groupBy: null,
  compactDate: false,
}

export const pageQuery = graphql`
  fragment EventTypeFields on wordpress__wp_events {
    event_types {
      name
      slug
      path
    }
  }
  fragment EventOrganizerFields on wordpress__wp_events {
    event_organizers {
      name
      slug
      path
      description
      association {
        title
        path
      }
    }
  }
  fragment EventListFields on wordpress__wp_events {
    id
    path
    title
    start_time
    end_time
    featured_media {
      localFile {
        ...FluidImage
      }
    }
    ...EventTypeFields
  }
`
