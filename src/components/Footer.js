import React from 'react'
import { Link, graphql } from 'gatsby'
import logo from '../img/logo-h.svg'

const Footer = () => (
  <footer className="site-footer">
    <div className="logo">
      <Link to="/">
        <img src={logo} alt="Det Norske Studentersamfund" />
      </Link>
    </div>
    <p>
      Studentene i Oslo har sitt naturlige tilholdssted på Det Norske
      Studentersamfund, i hyggelige lokaler på Chateau Neuf øverst på
      Majorstuen. Her er det åpent alle dager unntatt søndag, og enten man
      ønsker en tur i baren, på kafé, på debatt, på konsert, teater eller kino,
      har man muligheten på Det Norske Studentersamfund.
    </p>
    <div>
      Chateau Neuf – Det Norske Studentersamfund | Slemdalsveien 15, 0369 Oslo |
      Ansvarlig redaktør: Stein-Olav Moe Fause | <a href="#">Logg inn</a>
    </div>
    <nav className="social-nav">
      <a href="https://www.facebook.com/studentersamfundet">Facebook</a>
      <a href="https://www.instagram.com/studentersamfundet/">Instagram</a>
      <a href="https://twitter.com/dns1813">Twitter</a>
      <a href="https://www.flickr.com/groups/neuf/pool/">Flickr</a>
    </nav>
    <nav className="footer-nav">
      <Link to="/kontakt/">Kontakt</Link>
    </nav>
  </footer>
)

export default Footer
