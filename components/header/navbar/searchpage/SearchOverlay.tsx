import React, { useState, useEffect } from 'react'

import Column from '@components/Column'
import { SearchData } from '@lib/strapi/search'
import { titleToAnchor } from '@utils/helpers'
import ListCard from './ListCard'
import SearchBar from './SearchBar'
import { MdCancel } from 'react-icons/md'

type SearchOverlayProps = {
  onClose: () => void
  sessionToken?: string
  setSideMenuOpen: (state: boolean) => void
}

const SearchOverlay = ({
  onClose,
  sessionToken,
  setSideMenuOpen,
}: SearchOverlayProps) => {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchData>({
    sectionData: [],
    pageData: [],
    privateSectionData: [],
    privatePageData: [],
  })

  const clearResults = () => {
    setResults({
      sectionData: [],
      pageData: [],
      privateSectionData: [],
      privatePageData: [],
    })
  }

  // Add class to body to disable scrolling on main page
  useEffect(() => {
    document.body.classList.add('overflow-hidden')
    return () => {
      document.body.classList.remove('overflow-hidden')
    }
  }, [])

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-80 flex items-center justify-center z-50 bg-black p-10">
      <Column className="w-full h-full top-0 overflow-hidden">
        <button onClick={onClose} className="absolute top-2 right-2 text-xl">
          <MdCancel size={30} color="white" />
        </button>
        <SearchBar
          sessionToken={sessionToken}
          setQuery={setQuery}
          setResults={setResults}
          query={query}
          clearResults={clearResults}
        />
        <div className="mt-5 overflow-y-auto h-full p-4">
          {(results.pageData.length > 0 ||
            results.sectionData.length > 0 ||
            results.privatePageData.length > 0 ||
            results.privateSectionData.length > 0) && (
            <div>
              {results.pageData.map((page) => (
                <ListCard
                  key={page.attributes.title}
                  title={page.attributes.title}
                  setSideMenuOpen={setSideMenuOpen}
                  path={`/${page.attributes.category?.data.attributes.slug}/${page.attributes.slug}`}
                  onClick={onClose}
                  content={page.attributes.content}
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
                      onClick={onClose}
                      path={`/${section.attributes.content_page?.data?.attributes.category?.data.attributes.slug}/${section.attributes.content_page?.data.attributes.slug}#${titleToAnchor(section.attributes.title ?? '')}`}
                      content={section.attributes.content}
                    />
                  )
              )}
              {results.privatePageData.map((page) => (
                <ListCard
                  key={page.attributes.title}
                  title={page.attributes.title}
                  setSideMenuOpen={setSideMenuOpen}
                  path={`/medlem/${page.attributes.slug}`}
                  onClick={onClose}
                  content={page.attributes.content}
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
                      onClick={onClose}
                      path={`/medlem/${section.attributes.private_page?.data.attributes.slug}#${titleToAnchor(section.attributes.title ?? '')}`}
                      content={section.attributes.content}
                    />
                  )
              )}
            </div>
          )}
        </div>
      </Column>
    </div>
  )
}

export default SearchOverlay
