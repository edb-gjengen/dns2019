import React from 'react'
import PropTypes from 'prop-types'
import { graphql, Link } from 'gatsby'
import Layout from '../components/Layout'
import PostList from '../components/PostList'
import EventList from '../components/EventList'
import logo from '../img/logo/logo-xxl.svg'

export default class IndexPage extends React.Component {
  render() {
    const { data } = this.props
    const { edges: events } = data.allWordpressWpEvents
    const { edges: posts } = data.allWordpressPost

    return (
      <Layout classes="index">
        <EventList
          events={events}
          title="Dette skjer"
          maxEvents={10}
          showMore
        />
        <section className="front-page-info">
          <div className="address">
            <div>
              <h2>Besøk oss</h2>
              <p>Vi holder til på Majorstua.</p>
            </div>
            <div>
              <h2>Åpningstider</h2>
              <ul>
                <li>
                  Glassbaren:
                  <ul>
                    <li>Mandag–lørdag: 14:00–00:00</li>
                  </ul>
                </li>
                <li>
                  Bokcaféen:
                  <ul>
                    <li>Mandag–torsdag: 19:00–00:00</li>
                    <li>Fredag: 20:00–03:00</li>
                  </ul>
                </li>
              </ul>
              <a href="#">Se alle åpningstider</a>
            </div>
          </div>
          <div className="volunteer">
            <Link to="/bli-aktiv/" className="section-title">
              Bli frivillig
            </Link>
            <p>
              Vil du være med å arrangere greier på studentersamfundet? Sjekk ut
              de ulike <Link to="/bli-aktiv/">foreningene</Link> som holder til på
              Chateau Neuf.
            </p>
            <p>
              Vi trenger alltid flere engasjerte folk! Her er noen eksempler på
              roller du kan innta:
            </p>
            <ul>
              <li>Økonomiansvarlig</li>
              <li>Skuespiller</li>
              <li>Designere</li>
              <li>Utviklere</li>
            </ul>
          </div>
        </section>
        <PostList posts={posts} title="Aktuelt" showMore />
      </Layout>
    )
  }
}

IndexPage.propTypes = {
  data: PropTypes.shape({
    allWordpressPost: PropTypes.shape({
      edges: PropTypes.array,
    }),
    allWordpressWpEvents: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
}

export const pageQuery = graphql`
  query {
    allWordpressWpEvents(sort: { fields: start_time, order: ASC }) {
      edges {
        node {
          ...EventListFields
        }
      }
    }
    allWordpressPost(sort: { fields: date, order: DESC }, limit: 4) {
      edges {
        node {
          ...PostListFields
        }
      }
    }
  }
`
