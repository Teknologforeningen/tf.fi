import { SearchData, searchPublic } from '@lib/strapi/search'
import { titleToAnchor } from '@utils/helpers'
import { useRouter } from 'next/navigation'
import React, { useState, useEffect } from 'react'
import { MdSearch } from 'react-icons/md'

interface ListCardProps {
  title: string
  path: string
  setSideMenuOpen: (state: boolean) => void
}

interface SearchBarProps {
  setSideMenuOpen: (state: boolean) => void
}

const ListCard = ({ title, path, setSideMenuOpen }: ListCardProps) => {
  const router = useRouter()

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault()
    router.push(path)
    setSideMenuOpen(false)
  }

  return (
    <div className="p-2 link link-text block">
      <a
        onClick={handleClick}
        className="text-white no-underline"
      >
        {title}
      </a>
    </div>
  )
}

const SearchBar = ({ setSideMenuOpen }: SearchBarProps) => {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchData>({
    sectionData: [],
    pageData: [],
  })
  const [isFocused, setIsFocused] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

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
      const res = await searchPublic(query)

      setResults({
        sectionData: res.sectionData,
        pageData: res.pageData,
      })
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <div
      className="flex justify-center items-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative w-full max-w-md">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Sök..."
          className="w-full pl-10 pr-4 py-1.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        <MdSearch className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />

        {(isFocused || isHovered) &&
          (results.pageData.length > 0 || results.sectionData.length > 0) && (
            <div className="absolute left-0 mt-2 right-0 bg-darkgray ring-black bg-opacity-90 z-50 max-h-96 overflow-y-auto overflow-x-hidden rounded-md p-2">
              {results.pageData.map((page) => (
                <ListCard
                  key={page.attributes.title}
                  title={page.attributes.title}
                  setSideMenuOpen={setSideMenuOpen}
                  path={`/${page.attributes.category?.data.attributes.slug}/${page.attributes.slug}`}
                />
              ))}
              {results.sectionData.map(
                (section) =>
                  section.attributes.title && (
                    <ListCard
                      key={section.id}
                      title={section.attributes.title}
                      setSideMenuOpen={setSideMenuOpen}
                      path={`/${section.attributes.content_page?.data.attributes.category?.data.attributes.slug}/${section.attributes.content_page?.data.attributes.slug}#${titleToAnchor(section.attributes.title ?? '')}`}
                    />
                  )
              )}
            </div>
          )}
      </div>
    </div>
  )
}

export default SearchBar
