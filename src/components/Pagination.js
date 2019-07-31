import React from 'react'
import { Link } from 'gatsby'

const Pagination = ({ pageContext, pathPrefix }) => {
  const { previousPagePath, nextPagePath } = pageContext

  return (
    <nav className="pagination" role="navigation">
      {previousPagePath && (
        <Link to={previousPagePath} rel="prev" className="button button-prev">
          Forrige
        </Link>
      )}
      {nextPagePath && (
        <Link to={nextPagePath} rel="next" className="button button-next">
          Neste
        </Link>
      )}
    </nav>
  )
}

export default Pagination
