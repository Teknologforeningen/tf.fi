import React, { useState, useEffect } from 'react'
import Column from '@components/Column'
import { SearchData, searchDrive, searchSiteContent } from '@lib/strapi/search'
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
  const [isFetched, setIsFetched] = useState(false)
  const [fileResults, setFileResults] = useState<drive_v3.Schema$FileList>({
    files: [],
  })
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
    setFileResults({ files: [] })
    setIsFetched(false)
  }

  //search function for content or files depending on fileSearch state
  //append is used to load more files with same query
  const handleSearch = async (append = false) => {
    //do not search if query is less than 2 characters
    if (query.length < 2) return
    try {
      setSearching(true)
      if (fileSearch) {
        const resDrive = await searchDrive(
          query,
          //only nextPage if append is true
          append ? fileResults.nextPageToken ?? undefined : undefined
        )
        //if append then add to existing files else reset
        if (append) {
          resDrive &&
            append &&
            setFileResults({
              files: [...(fileResults.files ?? []), ...(resDrive.files || [])],
              nextPageToken: resDrive.nextPageToken,
            })
        } else {
          setFileResults(resDrive ?? { files: [] })
        }
        setSearching(false)
      } else {
        const res = await searchSiteContent(query, sessionToken)
        setResults({
          sectionData: res.sectionData,
          pageData: res.pageData,
          privateSectionData: res.privateSectionData,
          privatePageData: res.privatePageData,
        })
        setSearching(false)
      }
      setIsFetched(true)
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
    results?.pageData.length > 0 ||
    results?.sectionData.length > 0 ||
    results?.privatePageData.length > 0 ||
    results?.privateSectionData.length > 0

  const filesReturned =
    fileResults.files?.length && fileResults.files.length > 0

  return (
    <div className="z-50 fixed inset-0 bg-gray-800 bg-opacity-90 flex items-center justify-center bg-darkgray md:p-10 p-5 pt-12 pointer-events-auto overflow-y-auto">
      <Column className="prose w-full h-full">
        <button onClick={onClose} className="absolute top-3 right-3 text-xl">
          <MdCancel size={30} color="white" />
        </button>
        <div className="w-full items-start">
          <SearchBar
            setQuery={setQuery}
            handleSearch={handleSearch}
            query={query}
            clearResults={clearResults}
            searching={searching}
            setIsFetched={setIsFetched}
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
          {isFetched &&
            query.length >= 2 &&
            ((!contentReturned && !fileSearch) ||
              (!filesReturned && fileSearch)) && (
              <>
                {!fileSearch ? (
                  sessionToken ? (
                    <p className="text-white mt-4 left-0 text-opacity-70">
                      Vill du söka filer?{' '}
                      <span
                        onClick={() => {
                          setIsFetched(false)
                          setFileSearch(true)
                        }}
                        style={{
                          cursor: 'pointer',
                          textDecoration: 'underline',
                        }}
                      >
                        Klicka här för att söka filer med {query}.
                      </span>
                      .
                    </p>
                  ) : (
                    <p className="text-white mt-4 left-0 text-opacity-70">
                      Hitta inte vad du sökte? Logga in för att söka filer.
                    </p>
                  )
                ) : (
                  <p className="text-white mt-4 left-0 text-opacity-70">
                    Inga resultat hittades för {query}.
                  </p>
                )}
              </>
            )}
        </div>

        <div className="mt-5 h-full w-full">
          {!fileSearch && (
            <>
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
            </>
          )}
          {fileSearch && (
            <>
              {fileResults.files?.map(
                (file, idx) =>
                  file.id &&
                  file.name && (
                    <FileCard
                      key={file.id + idx}
                      id={file.id}
                      name={file.name}
                      thumbnailLink={file.thumbnailLink}
                    />
                  )
              )}
              {fileResults.nextPageToken && (
                //center button
                <div className="flex justify-center">
                  <button
                    onClick={() => handleSearch(true)}
                    disabled={searching}
                    className="mt-4 p-2 bg-teknologröd text-white rounded"
                  >
                    {searching ? 'Laddar...' : 'Ladda mera'}
                  </button>
                </div>
              )}
            </>
          )}
          <div className="h-16" />
        </div>
      </Column>
    </div>
  )
}

export default SearchOverlay
