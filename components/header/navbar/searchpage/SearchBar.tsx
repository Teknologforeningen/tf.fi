import ActivityIndicator from '@components/ActivityIndicator'
import React, { useEffect } from 'react'
import { MdCancel, MdSearch } from 'react-icons/md'

type SearchBarProps = {
  query: string
  handleSearch: () => void
  setQuery: (query: string) => void
  clearResults: () => void
  searching: boolean
  setIsFetched: (isFetched: boolean) => void
}

const SearchBar = ({
  query,
  handleSearch,
  setQuery,
  clearResults,
  searching,
  setIsFetched,
}: SearchBarProps) => {
  useEffect(() => {
    setIsFetched(false)
    const delayDebounceFn = setTimeout(() => {
      if (query) {
        handleSearch()
      }
    }, 500) // 500ms delay
    return () => clearTimeout(delayDebounceFn)
  }, [query])

  return (
    <div className="flex justify-center items-end w-full content-end">
      <div className="relative w-full items-center flex justify-center align-middle">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Sök..."
          className="w-full pl-10 pr-6 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2"
        />
        <MdSearch
          size={30}
          className="absolute left-3 top-4 h-5 w-5 text-gray-400"
        />
        <button
          onClick={() => {
            clearResults()
            setQuery('')
          }}
        >
          <MdCancel
            size={30}
            className="absolute right-3 top-4 h-5 w-5 text-gray-400"
          />
          {searching && (
            <div className="absolute right-9 top-3.5">
              <ActivityIndicator width={25} height={25} stroke="black" />
            </div>
          )}
        </button>
      </div>
    </div>
  )
}

export default SearchBar
