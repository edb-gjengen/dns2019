import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import Meta from '../components/Meta'
import Layout from '../components/Layout'

export const AssociationTemplate = ({
  title,
  content,
  featuredMedia,
  type,
  homepage,
}) => {
  const hasFeaturedMedia = featuredMedia && !!featuredMedia.localFile
  return (
    <section className="association-page">
      <div className="page-title-pre">{type}</div>
      <h1 className="page-title">{title}</h1>
      {hasFeaturedMedia && (
        <div className="association-logo">
          {featuredMedia.localFile.childImageSharp ? (
            <Img fluid={featuredMedia.localFile.childImageSharp.fluid} />
          ) : (
              <img src={featuredMedia.localFile.url} alt={title} />
            )}
        </div>
      )}
      {homepage && (
        <div className="association-homepage">
          &rarr; <a href={homepage}>Besøk vår nettside</a>
        </div>
      )}
      <div
        className="association-content wp-content"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </section>
  )
}

AssociationTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  featuredMedia: PropTypes.shape({}),
  type: PropTypes.string,
  homepage: PropTypes.string,
}

const AssociationPage = ({ data }) => {
  const { wordpressWpAssociations: association } = data

  return (
    <Layout>
      <Meta
        title={association.title}
        image={association.featured_media}
      />
      <AssociationTemplate
        title={association.title}
        content={association.content}
        type={association.association_type}
        homepage={association.association_homepage}
        featuredMedia={association.featured_media}
      />
    </Layout>
  )
}

AssociationPage.propTypes = {
  data: PropTypes.shape({}).isRequired,
}

export default AssociationPage

export const associationQuery = graphql`
  query AssociationById($id: String!) {
    wordpressWpAssociations(id: { eq: $id }) {
      title
      content
      association_type
      association_homepage
      featured_media {
        localFile {
          url
          ...FluidImage
        }
      }
    }
  }
`
