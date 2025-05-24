'use client'

import React from 'react'
import classNames from 'classnames'

type PageNavigationProps = {
  currentPage: number
  totalPages: number
  setPage: React.Dispatch<React.SetStateAction<number>>
}

const PageNavigation = ({ currentPage, totalPages, setPage }: PageNavigationProps) => {
  const prevPage = currentPage > 1 ? currentPage - 1 : null
  const nextPage = currentPage < totalPages ? currentPage + 1 : null

  return (
    <div className="my-5 flex items-center justify-center space-x-4">
      {prevPage && (
        <button onClick={() => setPage(1)} className="bg-gray-200 hover:bg-gray-300 rounded-lg p-2">
          &lt;
        </button>
      )}

      {Array.from({ length: totalPages }, (_, index) => (
        <button onClick={() => setPage(index + 1)} key={index + 1}>
          <p
            className={classNames(
              'rounded-lg p-2',
              currentPage === index + 1 ? 'bg-teknologröd text-white' : 'hover:bg-gray-300'
            )}
          >
            {index + 1}
          </p>
        </button>
      ))}

      {nextPage && (
        <button onClick={() => setPage(totalPages)} className="bg-gray-200 hover:bg-gray-300 rounded-lg p-2">
          &gt;
        </button>
      )}
    </div>
  )
}

export default PageNavigation
