import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { graphql, Link } from 'gatsby'
import Layout from '../components/Layout'
import Img from 'gatsby-image'

import moment from 'moment'
import 'moment/locale/nb'
moment.locale('nb')

const formatPrices = (regular, student) => {
  let cc = ''
  if (regular && regular != 0) {
    cc += regular
  }
  if (student && student != 0) {
    cc += ' / ' + student
  }
  return cc == '' ? 'Gratis' : cc
}

export const EventTemplate = ({
  content,
  title,
  featuredMedia,
  startTime,
  endTime,
  venue,
  facebookUrl,
  ticketUrl,
  priceStudent,
  priceRegular,
  eventTypes
}) => {
  return (
    <section className="event-page">
      <div className="event-hero">
        <div className="event-hero_text">
          <h1>
              {title}
          </h1>
          <div className="event-meta">
            <div className="venue">
              i {venue}
            </div>
            <div className="event-date">
              Dag:{' '}
              <span className="event-date-weekday">{moment(startTime).format('dddd')} </span>
              <span className="event-date-day">{moment(startTime).format('D.')} </span>
              <span className="event-date-month">{moment(startTime).format('MMMM')} </span>
              {/* Only specify year if different. */}
              {!moment(startTime).isSame(new Date(), 'year') &&
                <span className="event-date-year">{moment(startTime).format('YYYY')} </span>
              }
            </div>
            <div className="event-time-start">
                Start: {moment(startTime).format('HH:mm')}
            </div>
            {/* TODO: make the API stop assuming event duration is 2 hours when unspecified? */}
            {endTime &&
              <div className="event-time-end">
                Slutt: {moment(endTime).format('HH:mm')}
              </div>
            }
            <div className="price">
                Pris: {formatPrices(priceRegular, priceStudent)}
            </div>
            {ticketUrl &&
              <a className="ticket-url" href={ticketUrl}>Kjøp billetter</a>
            }
            {facebookUrl &&
              <a className="facebook-url" href={facebookUrl}>Se Facebook-event</a>
            }
            {eventTypes && eventTypes.length &&
              <div>
                <h4>Konsept</h4>
                <ul className="event-types">
                  {eventTypes.map(type => (
                    <li key={`${type.slug}`}>
                      <Link to={type.fields.link}>
                        {type.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            }
          </div>
        </div>
        <div className="event-hero_image">
          <Img fluid={featuredMedia.localFile.childImageSharp.fluid} />
        </div>
      </div>
      <div className="event-body">
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    </section>
  )
}

EventTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  title: PropTypes.string,
  featuredImage: PropTypes.object,
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
      title
      slug
      content
      start_time
      end_time
      venue
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
