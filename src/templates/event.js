import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { graphql, Link } from 'gatsby'
import Img from 'gatsby-image'
import moment from 'moment'
import 'moment/locale/nb'

import Layout from '../components/Layout'

moment.locale('nb')

const formatPrices = (regular, student) => {
  let cc = ''
  if (regular && regular !== 0) {
    cc += regular
  }
  if (student && student !== 0) {
    cc += ` / ${student}`
  }
  return cc === '' ? 'Gratis' : cc
}

export const EventTemplate = ({
  content,
  title,
  featuredMedia,
  startTime,
  endTime,
  venue,
  venueCustom,
  facebookUrl,
  ticketUrl,
  priceStudent,
  priceRegular,
  eventTypes,
}) => {
  const hasFeaturedMedia = featuredMedia && !!featuredMedia.localFile
  return (
    <section className="event-page">
      <div className="event-hero">
        <div className="event-hero-inner">
          <div className="event-hero_text">
            <h1>{title}</h1>
            <div className="event-meta">
              <div className="venue">
                {venueCustom && <span>{venueCustom}</span>}
                {venue && venue.title !== 'Hele huset' && (
                  <span>
                    {venue.preposition} <Link to={venue.path}>{venue.title}</Link>
                  </span>
                )}
                {venue && venue.title === 'Hele huset' && (
                  <span>på Chateau Neuf</span>
                )}
              </div>
              <div className="event-date">
                <span className="event-date-weekday">
                  {moment(startTime).format('dddd')}{' '}
                </span>
                <span className="event-date-day">
                  {moment(startTime).format('D.')}{' '}
                </span>
                <span className="event-date-month">
                  {moment(startTime).format('MMMM')}{' '}
                </span>
                {/* Only specify year if different. */}
                {!moment(startTime).isSame(new Date(), 'year') && (
                  <span className="event-date-year">
                    {moment(startTime).format('YYYY')}{' '}
                  </span>
                )}
              </div>
              <div className="event-time">
                {/* TODO: make the API stop assuming event duration is 2 hours when unspecified? */}
                kl. {moment(startTime).format('HH:mm')}
                &mdash;
                {endTime && moment(endTime).format('HH:mm')}
              </div>
              <div className="price">
                Pris: {formatPrices(priceRegular, priceStudent)}
              </div>
              {eventTypes && eventTypes.length && (
                <div className="event-types">
                  <ul>
                    {eventTypes.map(type => (
                      <li key={`${type.slug}`}>
                        <Link to={type.path}>{type.name}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
          {hasFeaturedMedia && (
            <div className="event-hero_image">
              <Img fluid={featuredMedia.localFile.childImageSharp.fluid} />
            </div>
          )}
        </div>
      </div>
      <div className="event-links">
        {ticketUrl && (
          <a className="event-link ticket-url" href={ticketUrl} target="_blank">
            <span>Kjøp billetter</span>
          </a>
        )}
        {facebookUrl && (
          <a className="event-link facebook-url" href={facebookUrl}>
            <span>Se Facebook-event</span>
          </a>
        )}
      </div>
      <div
        className="event-content wp-content"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </section>
  )
}

EventTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  featuredMedia: PropTypes.shape({}),
  startTime: PropTypes.string.isRequired,
  endTime: PropTypes.string,
  venue: PropTypes.shape({}),
  venueCustom: PropTypes.string,
  facebookUrl: PropTypes.string,
  ticketUrl: PropTypes.string,
  priceStudent: PropTypes.string,
  priceRegular: PropTypes.string,
  eventTypes: PropTypes.arrayOf(PropTypes.string),
}

const Event = ({ data }) => {
  const { wordpressWpEvents: event } = data

  return (
    <Layout>
      <Helmet title={`${event.title}`} />
      <EventTemplate
        title={event.title}
        content={event.content}
        featuredMedia={event.featured_media}
        startTime={event.start_time}
        endTime={event.end_time}
        venue={event.venue}
        venueCustom={event.venue_custom}
        facebookUrl={event.facebook_url}
        ticketUrl={event.ticket_url}
        priceStudent={event.price_member}
        priceRegular={event.price_regular}
        eventTypes={event.event_types}
      />
    </Layout>
  )
}

Event.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
}

export default Event

export const eventQuery = graphql`
  query EventByID($id: String!) {
    wordpressWpEvents(id: { eq: $id }) {
      id
      path
      title
      slug
      content
      start_time
      end_time
      venue {
        title
        path
        preposition
      }
      venue_custom
      facebook_url
      ticket_url
      price_member
      price_regular
      featured_media {
        localFile {
          ...FluidImage
        }
      }
      ...EventTypeFields
    }
  }
`
