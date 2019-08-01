import React from 'react'
import PropTypes from 'prop-types'
import Dropdown from 'react-dropdown'
import { Link, graphql, useStaticQuery, navigate } from 'gatsby'
import Img from 'gatsby-image'
import classNames from 'classnames'
import _ from 'lodash'
import moment from 'moment'
import 'moment/locale/nb'

moment.locale('nb')

const eventOrganizersQuery = graphql`
  query EventOrganizers {
    allWordpressWpEventOrganizers {
      edges {
        node {
          name
          slug
          path
        }
      }
    }
  }
`
const EventList = props => {
  const renderEvent = event => {
    const { compactDate } = props
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

  const renderEventsByDate = (filteredEvents, groupBy) => {
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
              return renderEvent(event)
            })}
          </div>
        </div>
      )
    })
  }

  const handleOrganizerFilterChange = ({ value }) => {
    navigate(`/organizer/${value}/`)
  }

  const {
    events,
    title,
    preTitle,
    classes,
    onlyUpcoming,
    maxEvents,
    groupBy,
    showMore,
    showFilter,
    filterOrganizer,
    children,
  } = props

  let filteredEvents = events.filter(({ node: event }) => {
    const startTime = moment(event.start_time)
    if (onlyUpcoming && !startTime.isSameOrAfter(new Date(), 'day')) {
      return false
    }
    return true
  })

  const data = useStaticQuery(eventOrganizersQuery)
  const { edges: organizers } = data.allWordpressWpEventOrganizers
  const organizerOptions = organizers.map(({ node: organizer }) => {
    return { value: organizer.slug, label: organizer.name }
  })
  const selectedOrganizer =
    filterOrganizer !== null
      ? organizers.find(obj => filterOrganizer === obj.node.slug).node
      : null
  const organizerOptionsDefault =
    selectedOrganizer !== null
      ? {
          value: selectedOrganizer.slug,
          label: selectedOrganizer.name,
        }
      : null

  if (maxEvents) {
    filteredEvents = filteredEvents.slice(0, maxEvents)
  }

  return (
    <section className={classNames('events', classes)}>
      {preTitle && <div className="page-title-pre">{preTitle}</div>}
      {title && <h1 className="section-title">{title}</h1>}
      {children !== null && children}
      {showFilter && organizers && (
        <div className="event-list-filter">
          <div className="event-list-filter-heading">Se arrangementer av</div>
          <Dropdown
            className="event-list-filter-dropdown"
            options={organizerOptions}
            onChange={handleOrganizerFilterChange}
            value={organizerOptionsDefault}
            placeholder="Arrangør"
          />
        </div>
      )}
      {groupBy && renderEventsByDate(filteredEvents, groupBy)}
      {!groupBy && (
        <div className="event-list">
          {filteredEvents.map(({ node: event }) => {
            return renderEvent(event)
          })}
        </div>
      )}
      {showMore && (
        <div className="show-more">
          <Link to="/program/" className="button button-large">
            <span>Se alle arrangementer</span>
          </Link>
        </div>
      )}
      {filteredEvents.length === 0 && (
        <div className="event-list-tumbleweed">
          {!selectedOrganizer && (
            <>
              Det ligger ingenting i programmet akkurat nå. Prøv igjen senere!
            </>
          )}
          {selectedOrganizer && (
            <>{selectedOrganizer.name} har ingen kommende arrangementer.</>
          )}
        </div>
      )}
    </section>
  )
}

EventList.propTypes = {
  children: PropTypes.shape({}),
  events: PropTypes.arrayOf(PropTypes.object),
  classes: PropTypes.string,
  preTitle: PropTypes.string,
  title: PropTypes.string,
  onlyUpcoming: PropTypes.bool,
  maxEvents: PropTypes.number,
  groupBy: PropTypes.string,
  compactDate: PropTypes.bool,
  showMore: PropTypes.bool,
  showFilter: PropTypes.bool,
  filterOrganizer: PropTypes.string,
}

EventList.defaultProps = {
  preTitle: null,
  onlyUpcoming: true,
  maxEvents: 0,
  groupBy: null,
  compactDate: false,
  showMore: false,
  showFilter: false,
  filterOrganizer: null,
}

export default EventList

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
