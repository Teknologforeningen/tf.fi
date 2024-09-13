import React, { useEffect } from 'react'
import { SearchData, searchPublic } from '@lib/strapi/search'
import { MdCancel, MdSearch } from 'react-icons/md'

type SearchBarProps = {
  query: string
  setResults: (results: SearchData) => void
  setQuery: (query: string) => void
  clearResults: () => void
  sessionToken?: string
}

const SearchBar = ({
  query,
  setResults,
  setQuery,
  sessionToken,
  clearResults,
}: SearchBarProps) => {
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (query) {
        handleSearch()
      }
    }, 500) // 500ms delay

    return () => clearTimeout(delayDebounceFn)
  }, [query])
  const handleSearch = async () => {
    try {
      const res = await searchPublic(query, sessionToken)
      console.log(res)
      setResults({
        sectionData: res.sectionData,
        pageData: res.pageData,
        privateSectionData: res.privateSectionData,
        privatePageData: res.privatePageData,
      })
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="flex justify-center items-end w-full content-end">
      <div className="relative w-full items-center flex justify-center align-middle">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Sök..."
          className="w-full pl-10 pr-6 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2"
          //onFocus={() => setIsFocused(true)}
          //onBlur={() => setIsFocused(false)}
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
        </button>
      </div>
    </div>
  )
}

export default SearchBar
