import React from 'react'
import { Link } from 'gatsby'

const Pagination = ({ pageContext, pathPrefix }) => {
  const { previousPagePath, nextPagePath } = pageContext

  return (
    <nav className="pagination" role="navigation">
      {previousPagePath && (
        <Link to={previousPagePath} rel="prev">
          &larr; Forrige
        </Link>
      )}
      {nextPagePath && (
        <Link to={nextPagePath} rel="next">
          Neste &rarr;
        </Link>
      )}
    </nav>
  )
}

export default Pagination
