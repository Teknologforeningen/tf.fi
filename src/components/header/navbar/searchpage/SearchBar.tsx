import ActivityIndicator from '@components/ActivityIndicator'
import React from 'react'
import { MdCancel, MdSearch } from 'react-icons/md'

type SearchBarProps = {
  query: string
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void
  clearResults: () => void
  searching: boolean
}

const SearchBar = ({ query, handleSearch, clearResults, searching }: SearchBarProps) => (
  <div className="flex justify-center items-end w-full content-end">
    <div className="relative w-full items-center flex justify-center align-middle">
      <input
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder="Sök..."
        className="w-full pl-10 pr-6 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2"
      />
      <MdSearch size={30} className="absolute left-3 top-4 h-5 w-5 text-gray-400" />
      <button onClick={clearResults}>
        <MdCancel size={30} className="absolute right-3 top-4 h-5 w-5 text-gray-400" />
        {searching && (
          <div className="absolute right-9 top-3.5">
            <ActivityIndicator width={25} height={25} stroke="black" />
          </div>
        )}
      </button>
    </div>
  </div>
)

export default SearchBar
