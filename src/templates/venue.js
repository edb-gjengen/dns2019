import React from 'react'
import PropTypes from 'prop-types'
import { graphql, Link } from 'gatsby'
import Img from 'gatsby-image'
import classNames from 'classnames'
import Meta from '../components/Meta'
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
        <div
          className="venue-content wp-content"
          dangerouslySetInnerHTML={{ __html: content }}
        />
        {hasFeaturedMedia && (
          <div className="venue-featured-image">
            {featuredMedia.localFile.childImageSharp ? (
              <Img fluid={featuredMedia.localFile.childImageSharp.fluid} />
            ) : (
                <img src={featuredMedia.localFile.url} alt={title} />
              )}
          </div>
        )}
        <div className="venue-text">
          <div className="venue-meta">
            <table>
              {floor && (
                <tr>
                  <td>Etasje</td>
                  <td>{floor}</td>
                </tr>
              )}
              {capacityLegal && (
                <tr>
                  <td>Branntillatelse for</td>
                  <td>{capacityLegal}</td>
                </tr>
              )}
              {capacityStanding && (
                <tr>
                  <td>Stående</td>
                  <td>{capacityStanding}</td>
                </tr>
              )}
              {capacitySitting && (
                <tr>
                  <td>Sittende</td>
                  <td>{capacitySitting}</td>
                </tr>
              )}
              {usedFor && (
                <tr>
                  <td>Bruk</td>
                  <td>{usedFor}</td>
                </tr>
              )}
              {bar && (
                <tr>
                  <td>Bar</td>
                  <td>{bar}</td>
                </tr>
              )}
              {audio && (
                <tr>
                  <td>Lyd</td>
                  <td>{audio}</td>
                </tr>
              )}
              {lighting && (
                <tr>
                  <td>Lys</td>
                  <td>{lighting}</td>
                </tr>
              )}
              {audioVideo && (
                <tr>
                  <td>A/V</td>
                  <td>{audioVideo}</td>
                </tr>
              )}
            </table>
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
      <Meta
        title={venue.title}
        image={venue.featured_media}
      />
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
        url
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
