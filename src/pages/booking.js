import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import Layout from '../components/Layout'

export const bookingPageQuery = graphql`
  query BookingPage {
    wordpressPage(slug: { eq: "booking" }) {
      title
      content
    }
    allWordpressWpVenues(
        sort: { fields: date, order: DESC }
      ) {
        totalCount
        edges {
          node {
            ...VenueFields
          }
        }
      }
  }
`

export const BookingPage = () => {
  const data = useStaticQuery(bookingPageQuery)
  const { title, content } = data.wordpressPage

  return (
    <Layout>
      <section className="page">
        <h1 className="page-title">{title}</h1>
        <div
          className="page-content wp-content"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </section>
    </Layout>
  )
}

export default BookingPage
