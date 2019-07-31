import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
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
      <h1 className="page-title">{title}</h1>
      {hasFeaturedMedia && (
        <div className="association-logo">
          <Img fluid={featuredMedia.localFile.childImageSharp.fluid} />
        </div>
      )}
      {homepage && (
        <div className="association-homepage">
          <a href="{{ homepage }}">Nettside</a>
        </div>
      )}
      <div className="association-type">Type: {type}</div>
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
          ...FluidImage
        }
      }
    }
  }
`
