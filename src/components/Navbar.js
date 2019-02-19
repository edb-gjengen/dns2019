import React from 'react'
import { Link, StaticQuery, graphql } from 'gatsby'
import github from '../img/github-icon.svg'
import logo from '../img/logo.svg'

const Navbar = () => (
  <StaticQuery
    query={graphql`
      query {
        allWordpressPage(sort: { fields: wordpress_id }, limit: 5) {
          edges {
            node {
              title
              slug
            }
          }
        }
      }
    `}
    render={data => (
      <header className="site-header">
        <div className="logo">
          <Link to="/">
            <img src={logo} alt="Det Norske Studentersamfund" />
          </Link>
        </div>
        <nav className="site-nav">
          {data.allWordpressPage.edges.map(edge => (
            <Link
              to={edge.node.slug}
              key={edge.node.slug}
            >
              {edge.node.title}
            </Link>
          ))}
          <div class="site-nav_toggle">=</div>
        </nav>
      </header>
    )}
  />
)

export default Navbar
