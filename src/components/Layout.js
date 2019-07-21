import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import Navbar from './Navbar'
import Footer from './Footer'
import '../css/main.scss'

const TemplateWrapper = ({ children, classes }) => (
  <div>
    <Helmet title="Det Norske Studentersamfund" />
    <Navbar />
    <main className={classes}>{children}</main>
    <Footer />
  </div>
)

TemplateWrapper.propTypes = {
  children: PropTypes.shape({}).isRequired,
  classes: PropTypes.string
}

export default TemplateWrapper
