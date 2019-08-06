import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import Layout from '../components/Layout'

export const PageTemplate = ({ title, content, featuredMedia }) => {
  const hasFeaturedMedia = featuredMedia && !!featuredMedia.localFile
  return (
    <section className="page">
      <h1 className="page-title">{title}</h1>
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
    </section>
  )
}

PageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  featuredMedia: PropTypes.shape({
    caption: PropTypes.string,
  }),
}

const Page = ({ data }) => {
  const { wordpressPage: page } = data

  return (
    <Layout>
      <Helmet title={page.title} />
      <PageTemplate
        title={page.title}
        content={page.content}
        featuredMedia={page.featured_media}
      />
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
      featured_media {
        caption
        localFile {
          url
          ...FluidImage
        }
      }
    }
  }
`
