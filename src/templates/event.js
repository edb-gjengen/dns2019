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
    <section className="event">
        <h1 className="title">
            {title}
        </h1>
        <div className="featured-image">
          <Img fluid={featuredMedia.localFile.childImageSharp.fluid} />
        </div>
        <div className="start-time">
            Start: {startTime}
        </div>
        {endTime &&
          <div className="end-time">
            Slutt: {endTime}
          </div>
        }
        <div className="venue">
            Lokale: {venue}
        </div>
        {facebookUrl &&
          <div className="facebook-url">
            Facebook: {facebookUrl}
          </div>
        }
        <div className="price">
            Pris: {formatPrices(priceRegular, priceStudent)}
        </div>
        {ticketUrl &&
          <div className="tickets">
            Kjøp billett: {ticketUrl}
          </div>
        }
        <div dangerouslySetInnerHTML={{ __html: content }} />
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
