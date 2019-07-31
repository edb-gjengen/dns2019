import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'

export const PageTemplate = ({ title, content }) => {
  return (
    <section className="page">
      <h1 className="page-title">{title}</h1>
      <div
        className="page-content wp-content"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </section>
  )
}

PageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
}

const Page = ({ data }) => {
  const { wordpressPage: page } = data

  return (
    <Layout>
      <Helmet title={page.title} />
      <PageTemplate title={page.title} content={page.content} />
    </Layout>
  )
}

Page.propTypes = {
  data: PropTypes.shape({}).isRequired,
}

export default Page

export const pageQuery = graphql`
  query PageById($id: String!) {
    wordpressPage(id: { eq: $id }) {
      title
      content
    }
  }
`
