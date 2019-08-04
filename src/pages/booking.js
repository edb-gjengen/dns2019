import React from 'react'
import Helmet from 'react-helmet'
import { graphql, useStaticQuery } from 'gatsby'
import Layout from '../components/Layout'
import { VenueTemplate } from '../templates/venue'

export const bookingPageQuery = graphql`
  query BookingPage {
    wordpressPage(slug: { eq: "booking" }) {
      title
      content
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
  const { title, content } = data.wordpressPage
  const venues = data.allWordpressWpVenues.edges

  return (
    <Layout>
      <Helmet title="Utleie" />
      <section className="booking-page">
        <h1 className="page-title">{title}</h1>
        <p className="lead">
          Chateau Neuf har lokaler til diverse arrangementer, og alle våre lokaler er tilgjengelige for utleie, både for studenter, utdanningsinstitusjoner og andre. Vi har blant annet huset Spellemannsprisen og Dalai Lama!
        </p>
        <a className="venue-anchor" href="#venue-list">Hopp til lokalene</a>
        <div
          className="page-content wp-content"
          dangerouslySetInnerHTML={{ __html: content }}
        />
        <VenueList venues={venues} />
        <div className="wp-content">
          <h2>Se utvalgte lokaler i vår 3D-løsning</h2>
          <p>
            Med vår 3D-løsning har du muligheten til å navigere deg rundt på
            huset! Du kan bevege deg mellom etasjer ved å trykke på tallene i lille kolonnen nederst til høyre. Dra deg rundt fra rom til rom ved å klikke dit du vil, og bruk den røde og hvite krystallen i høyre hjørne til å få opptil en 360 graders rotasjon i alle rom. Pluss- og minus-knappene i høyre hjørne kan brukes for å zoome inn eller ut. På denne måten får du en rask og god oversikt over lokalene, og får et solid innblikk i hvordan rommene ser ut. Vi har valgt at løsningen starter i øverste etasje i Storsalen - men ta gjerne en titt på lokalene i alle etasjer!
          </p>
        </div>
        <iframe
          title="Chateau Neuf i Google Maps"
          style={{ border: 0, height: '600px', width: '100%' }}
          src="https://www.google.com/maps/embed?pb=!4v1521198562809!6m8!1m7!1sCAoSLEFGMVFpcE81LWR3UFhhcDVSTUduaWcyWXFsbElyRGpLZThLdlBLWFFkbllm!2m2!1d59.93243773194!2d10.71237824484!3f50.83!4f1.5300000000000011!5f0.5970117501821992"
          frameBorder="0"
          allowFullScreen="allowfullscreen"
        />
      </section>
    </Layout>
  )
}

export default BookingPage
