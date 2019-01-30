import React from 'react'
import Helmet from 'react-helmet'

import Navbar from './Navbar'
import '../css/main.scss'

const TemplateWrapper = ({ children }) => (
  <div>
    <Helmet title="Det Norske Studentersamfund" />
    <Navbar />
    <main>{children}</main>
  </div>
)

export default TemplateWrapper
