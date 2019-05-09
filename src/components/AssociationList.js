import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'
import Img from 'gatsby-image'

export default class AssociationList extends React.Component {
  static renderAssociation(association) {
    return (
      <Link className="association" to={association.path} key={association.id}>
        {association.featured_media && association.featured_media.localFile && (
          <div className="association-image">
            <Img
              fluid={association.featured_media.localFile.childImageSharp.fluid}
            />
          </div>
        )}
        <div className="association-text">
          <h2 className="association-title">{association.title}</h2>

          <div
            className="association-description"
            dangerouslySetInnerHTML={{ __html: association.excerpt }}
          />
        </div>
      </Link>
    )
  }

  render() {
    const { associations, title } = this.props

    return (
      <section className="associations">
        <h1 className="page-title">{title}</h1>
        <p className="lead">
          Her burde det være en generell tekst om foreningene. Hva er en
          forening? Hvordan kan man bli med i en forening? Hva gjør foreningene?
          Kan jeg se alt som arrangeres av Kulturutvalget, for eksempel?
        </p>
        <div className="association-list">
          {associations.map(({ node: association }) =>
            this.renderAssociation(association)
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
    path
    title
    excerpt
    featured_media {
      localFile {
        ...FluidImage
      }
    }
  }
`
