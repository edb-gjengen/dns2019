import React from 'react'
import Helmet from 'react-helmet'
import Layout from '../components/Layout'

const NotFoundPage = () => (
  <Layout>
    <Helmet title="Ikke funnet" />
    <section className="page error error-404">
      <h1 className="section-title">404: Denne siden er på grisefest</h1>
      <p>Lykke til videre.</p>
    </section>
  </Layout>
)

export default NotFoundPage
