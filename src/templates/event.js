import React from 'react'
import PropTypes from 'prop-types'
import { graphql, Link } from 'gatsby'
import Img from 'gatsby-image'
import moment from 'moment'
import 'moment/locale/nb'

import Meta from '../components/Meta'
import Layout from '../components/Layout'

moment.locale('nb')

const formatPrices = (regular, student) => {
  let cc = ''
  if (regular) {
    cc += regular !== '0' ? regular : ''
  }
  if (student) {
    cc += cc !== '' ? ' / ' : ''
    cc += student !== '0' ? student : ''
  }
  return cc === '' ? 'Gratis' : cc
}

const formatOrganizers = organizers => {
  const total = organizers.length
  return organizers.map((organizer, index) => (
    <>
      {total > 1 && index === total - 1 && <> og </>}
      <span className="event-organizer">
        <Link to={organizer.path}>{organizer.name}</Link>
      </span>
      {total > 1 && index < total - 2 && <>, </>}
    </>
  ))
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
  organizers,
}) => {
  const hasFeaturedMedia = featuredMedia && !!featuredMedia.localFile
  /* TODO: Make API return proper UTC datetimes */
  const start = moment(startTime).utcOffset(1)
  return (
    <section className="event-page">
      <div className="event-hero">
        <div className="event-hero-inner">
          <div className="event-hero_text">
            <h1>{title}</h1>
            <div className="event-meta">
              <div className="event-meta-venue">
                {venueCustom && <span>{venueCustom}</span>}
                {venue && venue.title !== 'Hele huset' && (
                  <span>
                    {venue.preposition}{' '}
                    <Link to={venue.path}>{venue.title}</Link>
                  </span>
                )}
                {venue && venue.title === 'Hele huset' && (
                  <span>på Chateau Neuf</span>
                )}
              </div>
              <div className="event-date">
                <span className="event-date-weekday">
                  {start.format('dddd')}{' '}
                </span>
                <span className="event-date-day">
                  {start.format('D.')}{' '}
                </span>
                <span className="event-date-month">
                  {start.format('MMMM')}{' '}
                </span>
                {/* Only specify year if different. */}
                {!start.isSame(new Date(), 'year') && (
                  <span className="event-date-year">
                    {start.format('YYYY')}{' '}
                  </span>
                )}
              </div>
              <div className="event-time">
                {/* TODO: make the API stop assuming event duration is 2 hours when unspecified? */}
                kl. {start.format('HH:mm')}
                {endTime && <>&mdash;{moment(endTime).utcOffset(1).format('HH:mm')}</>}
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
              {organizers && (
                <div className="event-organizers">
                  <span className="event-organizers-title">Arrangeres av </span>
                  {formatOrganizers(organizers)}
                </div>
              )}
            </div>
          </div>
          {hasFeaturedMedia && (
            <>
              <div className="event-hero_image">
                {featuredMedia.localFile.childImageSharp ? (
                  <Img fluid={featuredMedia.localFile.childImageSharp.fluid} />
                ) : (
                    <img
                      src={featuredMedia.localFile.url}
                      alt={featuredMedia.caption || ''}
                    />
                  )}
              </div>
              {/* {featuredMedia.caption && (
                <div
                  className="event-hero_image-caption"
                  dangerouslySetInnerHTML={{ __html: featuredMedia.caption }}
                />
              )} */}
            </>
          )}
        </div>
      </div>
      <div className="event-links">
        {ticketUrl && (
          <a
            className="event-link ticket-url"
            href={ticketUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
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
  featuredMedia: PropTypes.shape({
    caption: PropTypes.string,
  }),
  startTime: PropTypes.string.isRequired,
  endTime: PropTypes.string,
  venue: PropTypes.shape({
    title: PropTypes.string,
    path: PropTypes.string,
    preposition: PropTypes.string,
  }),
  venueCustom: PropTypes.string,
  facebookUrl: PropTypes.string,
  ticketUrl: PropTypes.string,
  priceStudent: PropTypes.string,
  priceRegular: PropTypes.string,
  eventTypes: PropTypes.arrayOf(PropTypes.string),
  organizers: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      path: PropTypes.string,
    })
  ),
}

const Event = ({ data }) => {
  const { wordpressWpEvents: event } = data

  return (
    <Layout>
      <Meta
        title={event.title}
        image={event.featured_media}
      />
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
        organizers={event.event_organizers}
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
  fragment EventFields on wordpress__wp_events {
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
      caption
      localFile {
        url
        ...FluidImage
      }
    }
    ...EventTypeFields
    ...EventOrganizerFields
  }
  query EventByID($id: String!) {
    wordpressWpEvents(id: { eq: $id }) {
      ...EventFields
    }
  }
`
