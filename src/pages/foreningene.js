import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Meta from '../components/Meta'
import Layout from '../components/Layout'
import AssociationList from '../components/AssociationList'

export default class AssociationListPage extends React.Component {
  render() {
    const { data } = this.props
    const { edges: associations } = data.allWordpressWpAssociations

    return (
      <Layout>
        <Meta title="Foreningene" />
        <AssociationList associations={associations} title="Våre foreninger" />
      </Layout>
    )
  }
}

AssociationListPage.propTypes = {
  data: PropTypes.shape({
    allWordpressWpEvents: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
}

export const pageQuery = graphql`
  query {
    allWordpressWpAssociations(sort: { fields: title, order: ASC }) {
      edges {
        node {
          ...AssociationListFields
        }
      }
    }
  }
`
