import React, { useState, useEffect } from 'react'
import { SearchData, searchPublic } from '@lib/strapi/search'
import { titleToAnchor } from '@utils/helpers'
import { MdSearch } from 'react-icons/md'
import ListCard from './ListCard'

interface SearchBarProps {
  setSideMenuOpen: (state: boolean) => void
  sessionToken?: string
  isFocused: boolean
  setIsFocused: (state: boolean) => void
}

const extractSnippet = (
  text: string | undefined,
  searchParam: string,
  snippetLength = 250
) => {
  if (!text) return ''
  const index = text.toLowerCase().indexOf(searchParam.toLowerCase())
  if (index === -1) return ''
  const start = Math.max(index - snippetLength / 2, 0)
  const end = Math.min(
    index + searchParam.length + snippetLength / 2,
    text.length
  )
  const snippet = text.slice(start, end)
  const highlightedSnippet = snippet.replace(
    new RegExp(`(${searchParam})`, 'gi'),
    '<strong>$1</strong>'
  )
  return `${start > 0 ? '...' : ''}${highlightedSnippet}${end < text.length ? '...' : ''}`
}

const SearchBar = ({
  setSideMenuOpen,
  sessionToken,
  isFocused,
  setIsFocused,
}: SearchBarProps) => {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchData>({
    sectionData: [],
    pageData: [],
    privateSectionData: [],
    privatePageData: [],
  })

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
      <div className="relative w-full">
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

        {isFocused &&
          (results.pageData.length > 0 ||
            results.sectionData.length > 0 ||
            results.privatePageData.length > 0 ||
            results.privateSectionData.length > 0) && (
            <div className="absolute left-0 mt-2 right-0 bg-darkgray ring-black bg-opacity-90 z-50 max-h-[700px] overflow-y-auto overflow-x-hidden rounded-md p-2">
              {results.pageData.map((page) => (
                <ListCard
                  key={page.attributes.title}
                  title={page.attributes.title}
                  setSideMenuOpen={setSideMenuOpen}
                  path={`/${page.attributes.category?.data.attributes.slug}/${page.attributes.slug}`}
                  snippet={extractSnippet(page.attributes.content, query)}
                />
              ))}
              {results.sectionData.map(
                (section) =>
                  section.attributes?.title &&
                  section.attributes?.content_page?.data && (
                    <ListCard
                      key={section.id}
                      title={section.attributes.title}
                      setSideMenuOpen={setSideMenuOpen}
                      path={`/${section.attributes.content_page?.data?.attributes.category?.data.attributes.slug}/${section.attributes.content_page?.data.attributes.slug}#${titleToAnchor(section.attributes.title ?? '')}`}
                      snippet={extractSnippet(
                        section.attributes.content,
                        query
                      )}
                    />
                  )
              )}
              {results.privatePageData.map((page) => (
                <ListCard
                  key={page.attributes.title}
                  title={page.attributes.title}
                  setSideMenuOpen={setSideMenuOpen}
                  path={`/medlem/${page.attributes.slug}`}
                  snippet={extractSnippet(page.attributes.content, query)}
                />
              ))}
              {results.privateSectionData.map(
                (section) =>
                  section.attributes.title &&
                  section.attributes?.private_page?.data && (
                    <ListCard
                      key={section.id}
                      title={section.attributes.title}
                      setSideMenuOpen={setSideMenuOpen}
                      path={`/medlem/${section.attributes.private_page?.data.attributes.slug}#${titleToAnchor(section.attributes.title ?? '')}`}
                      snippet={extractSnippet(
                        section.attributes.content,
                        query
                      )}
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
