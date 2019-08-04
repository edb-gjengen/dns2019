import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { graphql, Link } from 'gatsby'
import Img from 'gatsby-image'
import classNames from 'classnames'
import Layout from '../components/Layout'
import Map from '../components/Map'

export class VenueTemplate extends React.Component {
  renderInner() {
    const {
      isSingle,
      path,
      title,
      content,
      featuredMedia,
      floor,
      capacityLegal,
      capacityStanding,
      capacitySitting,
      usedFor,
      bar,
      audio,
      audioVideo,
      lighting,
    } = this.props
    const hasFeaturedMedia = featuredMedia && !!featuredMedia.localFile

    return (
      <>
        {isSingle && (
          <div className="venue-hero">
            <div className="page-title-pre">Lokale</div>
            <h1 className="venue-title page-title">{title}</h1>
          </div>
        )}
        {!isSingle && (
          <Link to={path} className="venue-title">
            <h2>{title}</h2>
          </Link>
        )}
        {hasFeaturedMedia && (
          <div className="venue-featured-image">
            <Img fluid={featuredMedia.localFile.childImageSharp.fluid} />
          </div>
        )}
        <div className="venue-text">
          <div
            className="venue-content wp-content"
            dangerouslySetInnerHTML={{ __html: content }}
          />
          <div className="venue-meta">
            <ul>
              {floor && <li>Etasje: {floor}</li>}
              {capacityLegal && <li>Branntillatelse for: {capacityLegal}</li>}
              {capacityStanding && <li>Stående: {capacityStanding}</li>}
              {capacitySitting && <li>Sittende: {capacitySitting}</li>}
              {usedFor && <li>Bruk: {usedFor}</li>}
              {bar && <li>Bar: {bar}</li>}
              {audio && <li>Lyd: {audio}</li>}
              {lighting && <li>Lys: {lighting}</li>}
              {audioVideo && <li>A/V: {audioVideo}</li>}
            </ul>
          </div>
        </div>
        {isSingle && (
          <div className="venue-map">
            <Map />
          </div>
        )}
        {isSingle && (
          <Link to="/booking/" className="button button-large">
            <span>Se alle lokaler</span>
          </Link>
        )}
      </>
    )
  }

  render() {
    const { isSingle, featuredMedia } = this.props
    const hasFeaturedMedia = featuredMedia && !!featuredMedia.localFile
    const hasFeaturedMediaClass = hasFeaturedMedia
      ? 'has-featured-media'
      : 'no-featured-media'

    if (isSingle) {
      return (
        <section className={classNames('venue-page', hasFeaturedMediaClass)}>
          {this.renderInner()}
        </section>
      )
    }

    return (
      <div className={`venue ${hasFeaturedMediaClass}`}>
        {this.renderInner()}
      </div>
    )
  }
}

VenueTemplate.propTypes = {
  path: PropTypes.string,
  isSingle: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  featuredMedia: PropTypes.shape({
    localFile: PropTypes.shape({
      childImageSharp: PropTypes.shape({
        fluid: PropTypes.shape({}),
      }),
    }),
  }),
  floor: PropTypes.string,
  capacityLegal: PropTypes.string,
  capacityStanding: PropTypes.string,
  capacitySitting: PropTypes.string,
  usedFor: PropTypes.string,
  bar: PropTypes.string,
  audio: PropTypes.string,
  audioVideo: PropTypes.string,
  lighting: PropTypes.string,
}

const VenuePage = ({ data }) => {
  const { wordpressWpVenues: venue } = data

  return (
    <Layout>
      <Helmet title={venue.title} />
      <VenueTemplate
        isSingle
        path={venue.path}
        title={venue.title}
        content={venue.content}
        featuredMedia={venue.featured_media}
        floor={venue.floor}
        capacityLegal={venue.capacity_legal}
        capacityStanding={venue.capacity_standing}
        capacitySitting={venue.capacity_sitting}
        usedFor={venue.used_for}
        bar={venue.bar}
        audio={venue.audio}
        lighting={venue.lighting}
        audioVideo={venue.audio_video}
      />
    </Layout>
  )
}

VenuePage.propTypes = {
  data: PropTypes.shape({
    wordpressWpVenues: PropTypes.shape({}),
  }).isRequired,
}

export default VenuePage

export const pageQuery = graphql`
  fragment VenueFields on wordpress__wp_venues {
    id
    path
    title
    slug
    content
    floor
    capacity_legal
    capacity_standing
    capacity_sitting
    used_for
    bar
    audio
    lighting
    audio_video
    featured_media {
      localFile {
        ...FluidImage
      }
    }
  }
  query VenueById($id: String!) {
    wordpressWpVenues(id: { eq: $id }) {
      ...VenueFields
    }
  }
`
