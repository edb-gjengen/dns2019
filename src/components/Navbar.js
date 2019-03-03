import React from 'react'
import { Link, StaticQuery, graphql } from 'gatsby'
import github from '../img/github-icon.svg'
import logo from '../img/logo.svg'

export default class Navbar extends React.Component {
  toggleNav() {
    console.log('toggle')
  }

  render() {
    return (
      <header className="site-header">
        <nav className="site-nav">
          <Link to="/program/">Program</Link>
          <Link to="/nyheter/">Nyheter</Link>
          <Link to="/om-dns/">Praktisk</Link>
        </nav>
        <div className="logo">
          <Link to="/">
            <img src={logo} alt="Det Norske Studentersamfund" />
          </Link>
        </div>
        <nav className="site-nav">
          {/*data.allWordpressPage.edges.map(edge => (
            <Link
              to={edge.node.slug}
              key={edge.node.slug}
            >
              {edge.node.title}
            </Link>
          ))*/}
          <Link to="/om-dns/">Om oss</Link>
          <Link to="/foreningene/">Foreningene</Link>
          <Link to="/booking/">Utleie</Link>
          <div className="site-nav_toggle" onClick={this.toggleNav}>
            =
          </div>
        </nav>
      </header>
    )
  }
}
