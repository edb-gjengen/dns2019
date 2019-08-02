import React from 'react'
import { Link } from 'gatsby'
import logo from '../img/logo/logo-xs.svg'

export default class Navbar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showNav: false,
      headerSize: 200,
    }
    this.resizeHeader = this.resizeHeader.bind(this)
  }

  componentDidMount() {
    window.addEventListener('scroll', this.resizeHeader)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.resizeHeader)
  }

  toggleNav() {
    this.setState({
      showNav: !this.state.showNav,
    })
  }

  resizeHeader() {
    if (window.scrollY < 160) {
      this.setState({
        headerSize: 200 - window.scrollY,
      })
    }
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
          <Link to="/praktisk/">Praktisk</Link>
        </nav>
        <Link to="/" className="logo">
          <img src={logo} alt="Det Norske Studentersamfund" />
        </Link>
        <nav className="site-nav">
          <Link to="/om-dns/">Om oss</Link>
          <Link to="/foreningene/">Foreningene</Link>
          <Link to="/booking/">Utleie</Link>
        </nav>
        <div className="site-nav_toggle" onClick={this.toggleNav.bind(this)}>
          Meny &nbsp; <span class="open">&#9776;</span>
        </div>
        <div className="site-nav_program">
          <Link to="/program/">Program</Link>
        </div>
      </header>
    )
  }
}
