import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import Layout from '../components/Layout'
import Map from '../components/Map'

export class VenueTemplate extends React.Component {
  render() {
    const {
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
      <section
        className={`venue-page ${
          hasFeaturedMedia ? 'has-featured-media' : 'no-featured-media'
        }`}
      >
        <div className="venue-hero">
          <h1 className="page-title">{title}</h1>
          {hasFeaturedMedia && (
            <div className="venue-featured-image">
              <Img fluid={featuredMedia.localFile.childImageSharp.fluid} />
            </div>
          )}
        </div>
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
        <div className="venue-map">
          <Map />
        </div>
      </section>
    )
  }
}

VenueTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  featuredMedia: PropTypes.shape({}),
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
      <VenueTemplate
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
  data: PropTypes.shape({}).isRequired,
}

export default VenuePage

export const pageQuery = graphql`
  query VenueById($id: String!) {
    wordpressWpVenues(id: { eq: $id }) {
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
  }
`
