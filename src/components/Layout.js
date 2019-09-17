import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Navbar from './Navbar'
import Footer from './Footer'
import Meta from './Meta'
import '../css/main.scss'

const TemplateWrapper = ({ children, classes }) => (
  <div>
    <Meta />
    <Navbar />
    <main className={classNames(classes)}>{children}</main>
    <Footer />
  </div>
)

TemplateWrapper.propTypes = {
  children: PropTypes.shape({}).isRequired,
  classes: PropTypes.string,
}

export default TemplateWrapper
