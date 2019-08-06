import React from 'react'
import Helmet from 'react-helmet'
import { graphql, useStaticQuery } from 'gatsby'
import Img from 'gatsby-image'
import Layout from '../components/Layout'
import { VenueTemplate } from '../templates/venue'

export const bookingPageQuery = graphql`
  query BookingPage {
    wordpressPage(slug: { eq: "booking" }) {
      title
      content
      featured_media {
        caption
        localFile {
          ...FluidImage
        }
      }
    }
    allWordpressWpVenues(
      filter: { show_on_booking_page: { eq: "true" } }
      sort: { order: ASC, fields: menu_order }
    ) {
      edges {
        node {
          ...VenueFields
          menu_order
        }
      }
    }
  }
`

const VenueList = ({ venues }) => {
  return (
    <div className="venue-list" id="venue-list">
      <h2>Våre lokaler</h2>
      {venues.map(({ node: venue }) => (
        <VenueTemplate
          key={venue.id}
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
      ))}
    </div>
  )
}

export const BookingPage = () => {
  const data = useStaticQuery(bookingPageQuery)
  const { title, content, featured_media: featuredMedia } = data.wordpressPage
  const venues = data.allWordpressWpVenues.edges
  const hasFeaturedMedia = featuredMedia && !!featuredMedia.localFile

  return (
    <Layout>
      <Helmet title="Utleie" />
      <section className="booking-page">
        <h1 className="page-title">{title}</h1>
        <p className="lead">
          Chateau Neuf har lokaler til diverse arrangementer, og alle våre
          lokaler er tilgjengelige for utleie, både for studenter,
          utdanningsinstitusjoner og andre. Vi har blant annet huset
          Spellemannsprisen og Dalai Lama!
        </p>
        <a className="venue-anchor" href="#venue-list">
          Hopp til lokalene
        </a>
        {hasFeaturedMedia && (
          <div className="page-hero">
            <div className="page-hero_image">
              {featuredMedia.localFile.childImageSharp ? (
                <Img fluid={featuredMedia.localFile.childImageSharp.fluid} />
              ) : (
                <img
                  src={featuredMedia.localFile.url}
                  alt={featuredMedia.caption || ''}
                />
              )}
            </div>
            {featuredMedia.caption && (
              <div
                className="page-hero_image-caption"
                dangerouslySetInnerHTML={{ __html: featuredMedia.caption }}
              />
            )}
          </div>
        )}
        <div
          className="page-content wp-content"
          dangerouslySetInnerHTML={{ __html: content }}
        />
        <VenueList venues={venues} />
        <div className="wp-content">
          <h2>Se utvalgte lokaler i vår 3D-løsning</h2>
          <p>
            Med vår 3D-løsning har du muligheten til å navigere deg rundt på
            huset! Du kan bevege deg mellom etasjer ved å trykke på tallene i
            lille kolonnen nederst til høyre. Dra deg rundt fra rom til rom ved
            å klikke dit du vil. Den røde og hvite kompassnålen lar deg rotere
            bildet. Pluss- og minus-knappene i høyre hjørne kan brukes for å
            zoome inn eller ut. Du starter i foajeen i 1. etasje &ndash; men ta
            gjerne en titt på lokalene i alle etasjer!
          </p>
        </div>
        <iframe
          title="Chateau Neuf i Google Maps"
          style={{ border: 0, height: '600px', width: '100%' }}
          src="https://www.google.com/maps/embed?pb=!4v1564960100338!6m8!1m7!1sCAoSLEFGMVFpcE4tMGpFUG5hUElid1hScG55WVV4U0gzUmZRdGVHOEg0UkFKcWg5!2m2!1d59.932353882678!2d10.712740301537!3f318.4342482323312!4f-5.31237031710549!5f0.7820865974627469"
          frameBorder="0"
          allowFullScreen="allowfullscreen"
        />
      </section>
    </Layout>
  )
}

export default BookingPage
