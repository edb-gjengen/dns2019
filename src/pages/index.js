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
          <div className="visit-us">
            <div className="inner">
              <h2 className="section-title">Besøk oss</h2>
              <div className="address">
                <p>Vi holder til på Majorstua, i Slemdalsveien 15.</p>
                <a href="https://www.google.no/maps/place/Slemdalsveien+15,+0369+Oslo/data=!4m2!3m1!1s0x46416dc4ab53aa7d:0x5629681f36c1c8af?sa=X&ved=2ahUKEwjR94re3unjAhUj4aYKHRLOAuwQ8gEwAHoECBQQAQ" target="_blank" className="button button-small">Se i Google Maps</a>
              </div>
              <div className="opening-hours">
                <ul>
                  <li>
                    <span class="opening-hours_venue">Glassbaren</span>
                    <ul>
                      <li>Mandag–lørdag: 14:00–00:00</li>
                    </ul>
                  </li>
                  <li>
                  <span class="opening-hours_venue">Bokcaféen</span>
                    <ul>
                      <li>Mandag–torsdag: 19:00–00:00</li>
                      <li>Fredag: 20:00–03:00</li>
                    </ul>
                  </li>
                </ul>
                <a href="#" className="button button-small">Se alle åpningstider</a>
              </div>
            </div>
          </div>
          <div className="volunteer">
            <div className="inner">
              <Link to="/bli-aktiv/" className="section-title">
                Bli frivillig
              </Link>
              <p>
              Chateau Neuf drives i stor grad av frivillige. Vil du være med å arrangere greier på studentersamfundet? Sjekk ut de ulike <Link to="/bli-aktiv/">foreningene</Link> som holder til på huset for å finne ut hva som passer for deg.
              </p>
              <Link to="/bli-aktiv/" className="button button-small">
                Les mer om å bli frivillig
              </Link>
            </div>
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
