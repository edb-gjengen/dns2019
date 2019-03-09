import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Img from 'gatsby-image'

export const AssociationTemplate = data => {
  const {
    title,
    content,
    hasFeaturedMedia,
    featuredMedia,
    type,
    homepage,
  } = data
  return (
    <section className="association-page">
      <h1 className="section-title">{title}</h1>
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
}

const Association = ({ data }) => {
  const { wordpressWpAssociations: association } = data

  return (
    <Layout>
      <AssociationTemplate
        title={association.title}
        content={association.content}
        type={association.association_type}
        homepage={association.association_homepage}
        hasFeaturedMedia={!!association.featured_media.localFile}
        featuredMedia={association.featured_media}
      />
    </Layout>
  )
}

Association.propTypes = {
  data: PropTypes.object.isRequired,
}

export default Association

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
