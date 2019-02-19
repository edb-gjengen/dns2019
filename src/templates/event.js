import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { graphql, Link } from 'gatsby'
import Layout from '../components/Layout'
import Img from 'gatsby-image'

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
  priceRegular
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
            <div className="start-time">
              Start: {startTime}
            </div>
            {endTime &&
              <div className="end-time">
                Slutt: {endTime}
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
        endTime={event.start_time}
        venue={event.venue}
        facebookUrl={event.facebook_url}
        ticketUrl={event.ticket_url}
        priceStudent={event.price_member}
        priceRegular={event.price_regular}
        // categories={post.categories}
        // tags={post.tags}
        // date={post.date}
        // author={post.author}
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
    slug
    content
    title
  }
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
    }
  }
`
