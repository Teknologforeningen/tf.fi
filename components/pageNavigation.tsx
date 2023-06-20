import React from 'react'

type Props = {
  currentPage: number
  totalPages: number
  setPage: (page: number) => void
}

const PageNavigation = ({ currentPage, totalPages, setPage }: Props) => {
  const prevPage = currentPage > 1 ? currentPage - 1 : null
  const nextPage = currentPage < totalPages ? currentPage + 1 : null

  return (
    <div className="flex items-center justify-center space-x-4 my-5">
      {prevPage && (
        <button
          onClick={() => setPage(1)}
          className="bg-gray-200 hover:bg-gray-300 rounded-lg p-2"
        >
          &lt;
        </button>
      )}

      {Array.from({ length: totalPages }, (_, index) => (
        <button onClick={() => setPage(index + 1)} key={index + 1}>
          <p
            className={`rounded-lg p-2 ${
              currentPage === index + 1
                ? 'bg-teknologröd text-white'
                : 'hover:bg-gray-300'
            }`}
          >
            {index + 1}
          </p>
        </button>
      ))}

      {nextPage && (
        <button
          onClick={() => setPage(totalPages)}
          className="bg-gray-200 hover:bg-gray-300 rounded-lg p-2"
        >
          &gt;
        </button>
      )}
    </div>
  )
}

export default PageNavigation
