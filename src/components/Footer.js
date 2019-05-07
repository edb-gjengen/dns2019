import React from 'react'
import { Link, graphql } from 'gatsby'
import logo from '../img/logo/logo-h.svg'

const Footer = () => (
  <footer className="site-footer">
    <div className="info">
      <div className="logo">
        <Link to="/">
          <img src={logo} alt="Det Norske Studentersamfund" />
        </Link>
      </div>
      <nav className="social-nav">
        <a href="https://www.facebook.com/studentersamfundet" target="_blank">
          <svg xmlns="http://www.w3.org/2000/svg" width="49.652" height="49.652" viewBox="0 0 49.652 49.652"><path fill="#fff" d="M24.826 0C11.137 0 0 11.137 0 24.826c0 13.688 11.137 24.826 24.826 24.826 13.688 0 24.826-11.138 24.826-24.826C49.652 11.137 38.516 0 24.826 0zM31 25.7h-4.039v14.396h-5.985V25.7h-2.845v-5.088h2.845v-3.291c0-2.357 1.12-6.04 6.04-6.04l4.435.017v4.939h-3.219c-.524 0-1.269.262-1.269 1.386v2.99h4.56L31 25.7z"></path></svg>
        </a>
        <a href="https://www.instagram.com/studentersamfundet/" target="_blank">
          <svg xmlns="http://www.w3.org/2000/svg" width="49.652" height="49.652" viewBox="0 0 49.652 49.652"><g fill="#fff"><path d="M24.825 29.796a4.978 4.978 0 0 0 4.972-4.97 4.954 4.954 0 0 0-.94-2.897 4.964 4.964 0 0 0-4.029-2.073c-1.659 0-3.126.82-4.031 2.072a4.947 4.947 0 0 0-.94 2.897 4.973 4.973 0 0 0 4.968 4.971zm10.853-11.05V13.96l-.623.002-4.164.013.016 4.787z"></path><path d="M24.826 0C11.137 0 0 11.137 0 24.826c0 13.688 11.137 24.826 24.826 24.826 13.688 0 24.826-11.138 24.826-24.826C49.652 11.137 38.516 0 24.826 0zm14.119 21.929v11.56a5.463 5.463 0 0 1-5.457 5.458H16.164a5.462 5.462 0 0 1-5.457-5.458V16.165a5.462 5.462 0 0 1 5.457-5.457h17.323a5.463 5.463 0 0 1 5.458 5.457v5.764z"></path><path d="M32.549 24.826c0 4.257-3.464 7.723-7.723 7.723s-7.722-3.466-7.722-7.723a7.67 7.67 0 0 1 .568-2.897h-4.215v11.56a2.706 2.706 0 0 0 2.706 2.704h17.323a2.707 2.707 0 0 0 2.706-2.704v-11.56h-4.217c.367.894.574 1.873.574 2.897z"></path></g></svg>
        </a>
        <a href="https://twitter.com/dns1813" target="_blank">
          <svg xmlns="http://www.w3.org/2000/svg" width="49.652" height="49.652" viewBox="0 0 49.652 49.652"><path fill="#fff" d="M24.826 0C11.137 0 0 11.137 0 24.826c0 13.688 11.137 24.826 24.826 24.826 13.688 0 24.826-11.138 24.826-24.826C49.652 11.137 38.516 0 24.826 0zm11.075 19.144c.011.246.017.494.017.742 0 7.551-5.746 16.255-16.259 16.255-3.227 0-6.231-.943-8.759-2.565.447.053.902.08 1.363.08 2.678 0 5.141-.914 7.097-2.446a5.72 5.72 0 0 1-5.338-3.969 5.76 5.76 0 0 0 2.58-.096 5.715 5.715 0 0 1-4.583-5.603l.001-.072a5.69 5.69 0 0 0 2.587.714 5.71 5.71 0 0 1-2.541-4.755c0-1.048.281-2.03.773-2.874a16.225 16.225 0 0 0 11.777 5.972 5.707 5.707 0 0 1-.147-1.303 5.714 5.714 0 0 1 9.884-3.91 11.406 11.406 0 0 0 3.63-1.387 5.74 5.74 0 0 1-2.516 3.162 11.36 11.36 0 0 0 3.282-.899 11.494 11.494 0 0 1-2.848 2.954z"></path></svg>
        </a>
        <a href="https://www.flickr.com/groups/neuf/pool/" target="_blank">
          <svg xmlns="http://www.w3.org/2000/svg" width="97.75" height="97.75" viewBox="0 0 97.75 97.75"><path fill="#fff" d="M48.875 0C21.883 0 0 21.882 0 48.875S21.883 97.75 48.875 97.75 97.75 75.868 97.75 48.875 75.867 0 48.875 0zM28.277 66.361c-8.895 0-16.105-7.828-16.105-17.486s7.211-17.487 16.105-17.487 16.106 7.829 16.106 17.487-7.211 17.486-16.106 17.486zm40.731-.416c-9.152 0-16.57-7.735-16.57-17.279 0-9.542 7.418-17.278 16.57-17.278 9.15 0 16.57 7.736 16.57 17.278 0 9.544-7.42 17.279-16.57 17.279z"></path></svg>
        </a>
      </nav>
    </div>
  </footer>
)

export default Footer
