import React, { useState, useEffect } from 'react'
import Column from '@components/Column'
import { SearchData, searchDrive, searchPublic } from '@lib/strapi/search'
import { titleToAnchor } from '@utils/helpers'
import ListCard from './ListCard'
import SearchBar from './SearchBar'
import { MdCancel } from 'react-icons/md'
import { drive_v3 } from 'googleapis'
import FileCard from './FileCard'

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
  const [fileSearch, setFileSearch] = useState(false)
  const [searching, setSearching] = useState(false)
  const [fileResults, setFileResults] = useState<drive_v3.Schema$File[]>([])
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
    setFileResults([])
  }

  const handleSearch = async () => {
    //do not search if query is less than 2 characters
    if (query.length < 2) return
    try {
      setSearching(true)
      if (fileSearch) {
        const resDrive = await searchDrive(query)
        setFileResults(resDrive || [])
        setSearching(false)
      } else {
        const res = await searchPublic(query, sessionToken)
        setResults({
          sectionData: res.sectionData,
          pageData: res.pageData,
          privateSectionData: res.privateSectionData,
          privatePageData: res.privatePageData,
        })
        setSearching(false)
      }
    } catch (error) {
      setSearching(false)
      console.error(error)
    }
  }

  // Add class to body to disable interaction with main page
  useEffect(() => {
    document.body.classList.add('overflow-hidden')
    document.body.style.pointerEvents = 'none'
    return () => {
      document.body.classList.remove('overflow-hidden')
      document.body.style.pointerEvents = 'auto'
    }
  }, [])

  //search with new param when search content changes
  useEffect(() => {
    handleSearch()
  }, [fileSearch])

  const contentReturned =
    results.pageData.length > 0 ||
    results.sectionData.length > 0 ||
    results.privatePageData.length > 0 ||
    results.privateSectionData.length > 0

  const filesReturned = fileResults.length > 0

  return (
    <div className="z-50 fixed inset-0 bg-gray-800 bg-opacity-90 flex items-center justify-center  bg-darkgray md:p-10 p-5 pt-12 pointer-events-auto">
      <Column className="w-full h-full top-0 overflow-hidden">
        <button onClick={onClose} className="absolute top-2 right-2 text-xl">
          <MdCancel size={30} color="white" />
        </button>
        <div className="w-full items-start">
          <SearchBar
            sessionToken={sessionToken}
            setQuery={setQuery}
            handleSearch={handleSearch}
            query={query}
            clearResults={clearResults}
            searching={searching}
          />
          {sessionToken && (
            <div className="flex text-white mt-4">
              <button
                className={`px-4 py-2 rounded-md ${!fileSearch ? 'bg-teknologröd' : 'bg-gray-500'}`}
                onClick={() => setFileSearch(false)}
              >
                Sök nätsidan
              </button>
              <button
                className={`px-4 py-2 rounded-md ${fileSearch ? 'bg-teknologröd' : 'bg-gray-500'}`}
                onClick={() => setFileSearch(true)}
              >
                Sök filer
              </button>
            </div>
          )}
          {query.length < 2 &&
            ((!contentReturned && !fileSearch) ||
              (!filesReturned && fileSearch)) &&
            !searching && (
              <p className="text-white mt-4 left-0 text-opacity-70">
                Sök med minst två tecken...
              </p>
            )}
        </div>

        <div className="mt-3 overflow-y-auto h-full max-w-full">
          {!fileSearch && (
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
          {fileSearch && (
            <div className="overflow-y-auto overflow-x-hidden">
              {fileResults.map(
                (file) =>
                  file.id &&
                  file.name && (
                    <FileCard
                      key={file.id}
                      id={file.id}
                      name={file.name}
                      thumbnailLink={file.thumbnailLink}
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
