import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import { Link } from 'gatsby'
import Layout from '../components/Layout'
import PostList from '../components/PostList'
import EventList from '../components/EventList'


export default class IndexPage extends React.Component {
  render() {
    const { data } = this.props
    const { edges: events } = data.allWordpressWpEvents
    const { edges: posts } = data.allWordpressPost

    return (
      <Layout>
        <EventList events={events} numDays={7} groupBy="day" />
        <Link to="/program/">Vis alle</Link>
        <section className="front-page-info">
          <div className="opening-hours">
            <h2>Åpningstider</h2>
            <ul>
              <li>Glassbaren:</li>
              <li>Bokcaféen:</li>
            </ul>
          </div>
          <div className="address">
            <h2>Adresse</h2>
            <p>Finn veibeskrivelse</p>
            <label for="directions">Jeg vil reise fra:</label>
            <input type="text" name="directions" placeholder="Skriv inn adresse" />
            
          </div>
        </section>
        <section className="volunteer">
          <Link to="/bli-aktiv/"><h1 className="section-title">Bli frivillig</h1></Link>
          <p>Vil du være med å arrangere greier på studentersamfundet? Kom æ</p>
        </section>
        <PostList posts={posts} title="Aktuelt" />
        <Link to="/nyheter/">Vis alle</Link>
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
