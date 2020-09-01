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
            <h2 className="section-title">Besøk oss</h2>
            <p>
              Lyst på en kopp kaffe, eller trenger du og studiegjengen en
              møteplass? Stikk innom Studentersamfundet på Chateau Neuf!{' '}
              <a
                href="https://www.google.no/maps/place/Chateau+Neuf+-+The+Norwegian+Students'+Society/@59.9309074,10.7108124,16.25z/data=!4m5!3m4!1s0x46416ddb5278789f:0xadda2b97f9d1cad6!8m2!3d59.932257!4d10.712493"
                target="_blank"
                rel="noopener noreferrer"
              >
                Du finner oss på Majorstua.
              </a>
            </p>
            <div className="visit-us_links">
              <Link to="/praktisk/" className="button button-small">
                Praktisk informasjon
              </Link>
              <br />
              <Link to="/aapningstider/" className="button button-small">
                Åpningstider
              </Link>
            </div>
          </div>
          <div className="volunteer">
            <div className="inner">
              <Link to="/bli-aktiv/" className="section-title">
                Bli frivillig
              </Link>
              <p>
                Chateau Neuf drives i stor grad av engasjerte frivillige. Vi er
                alltid ute etter flere studenter som vil drifte Oslo-studentenes
                kulturhus. Sjekk ut våre{' '}
                <Link to="/foreningene/">foreninger</Link> for å se hva som kan
                passe deg.
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
  query IndexPage($after: Date!) {
    allWordpressWpEvents(
      sort: { fields: start_time, order: ASC }
      filter: { start_time: { gt: $after } }
    ) {
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
