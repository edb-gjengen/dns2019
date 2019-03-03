import React from 'react'
import { Link, StaticQuery, graphql } from 'gatsby'
import github from '../img/github-icon.svg'
import logo from '../img/logo.svg'

export default class Navbar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showNav: false,
    }
  }

  toggleNav() {
    this.setState({
      showNav: !this.state.showNav,
    })
  }

  render() {
    return (
      <header
        className={`site-header ${
          this.state.showNav ? 'site-nav-visible' : ''
        }`}
      >
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
          <Link to="/om-dns/">Om oss</Link>
          <Link to="/foreningene/">Foreningene</Link>
          <Link to="/booking/">Utleie</Link>
          <div className="site-nav_toggle" onClick={this.toggleNav.bind(this)}>
            =
          </div>
        </nav>
      </header>
    )
  }
}
