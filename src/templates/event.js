import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { graphql, Link } from 'gatsby'
import Layout from '../components/Layout'

export const EventTemplate = ({
  content,
  title,
}) => {
  return (
    <section className="event">
        <h1 className="title">
            {title}
        </h1>
        <div dangerouslySetInnerHTML={{ __html: content }} />
    </section>
  )
}

EventTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  title: PropTypes.string,
}

const Event = ({ data }) => {
  const { wordpressWpEvents: event } = data

  return (
    <Layout>
      <Helmet title={`${event.title}`} />
      <EventTemplate
        content={event.content}
        // categories={post.categories}
        // tags={post.tags}
        title={event.title}
        // date={post.date}
        //author={post.author}
      />
    </Layout>
  )
}

Event.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
}

export default Event

export const eventQuery = graphql`
  fragment EventFields on wordpress__wp_events {
    id
    slug
    content
    title
  }
  query EventByID($id: String!) {
    wordpressWpEvents(id: { eq: $id }) {
      id
      title
      slug
      content
      start_time(formatString: "MMMM DD, YYYY")
      end_time(formatString: "MMMM DD, YYYY")
    }
  }
`
