import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'
import Img from 'gatsby-image'

export default class AssociationList extends React.Component {
  render_association(association) {
    return (
      <div className="association">
        {association.featured_media && association.featured_media.localFile && (
          <div className="association-image">
            <Img
              fluid={
                association.featured_media.localFile.childImageSharp.fluid
              }
            />
          </div>
        )}
        <div className="association-text">
          <Link
            to={association.fields.link}
            key={association.id}
          >
            <h2 className="association-title">{association.title}</h2>
          </Link>

          <div
            className="association-description"
            dangerouslySetInnerHTML={{ __html: association.excerpt }}
          />
        </div>
      </div>
    )
  }

  render() {
    const { associations, title } = this.props

    return (
      <section className="associations">
        <h1 className="section-title">{title}</h1>
        <div className="association-list">
          {associations.map(({ node: association }) =>
            this.render_association(association)
          )}
        </div>
      </section>
    )
  }
}

AssociationList.propTypes = {
  associations: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string,
}

export const pageQuery = graphql`
  fragment AssociationListFields on wordpress__wp_associations {
    id
    title
    excerpt
    featured_media {
      localFile {
        ...FluidImage
      }
    }
    fields {
      link
    }
  }
`
