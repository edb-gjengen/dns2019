import React from 'react'
import { Link, StaticQuery, graphql } from 'gatsby'
import github from '../img/github-icon.svg'
import logo from '../img/logo/logo-xl.svg'

export default class Navbar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showNav: false,
      headerSize: 200
    }
    this.resizeHeader = this.resizeHeader.bind(this);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.resizeHeader);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.resizeHeader);
  }

  toggleNav() {
    this.setState({
      showNav: !this.state.showNav,
    })
  }

  resizeHeader() {
    console.log(this.state.headerSize)
    if (window.scrollY < 160) {
      this.setState({
        headerSize: 200 - window.scrollY,
      })
    }
  }

  render() {
    return (
      <header
        className={`site-header ${this.state.showNav ? 'site-nav-visible' : ''}`}
        style={{ height: `${ this.state.headerSize }px` }}
      >
        <nav className="site-nav">
          <Link to="/program/">Program</Link>
          <Link to="/nyheter/">Nyheter</Link>
          <Link to="/om-dns/">Praktisk</Link>
        </nav>
        <Link to="/" className="logo" style={{ width: `${ this.state.headerSize }px`, height: `${ this.state.headerSize }px` }}>
          <img src={logo} alt="Det Norske Studentersamfund" />
        </Link>
        <nav className="site-nav">
          <Link to="/om-dns/">Om oss</Link>
          <Link to="/foreningene/">Foreningene</Link>
          <Link to="/booking/">Utleie</Link>
        </nav>
        <div className="site-nav_toggle" onClick={this.toggleNav.bind(this)}>
          =
        </div>
      </header>
    )
  }
}
