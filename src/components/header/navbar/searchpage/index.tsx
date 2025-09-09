import React, { useEffect, useRef, useReducer } from 'react'
import Column from '@components/Column'
import { getDriveDirectories, searchDrive, searchSiteContent } from '@lib/strapi/search'
import { titleToAnchor, debounce, buildFolderPaths } from '@utils/helpers'
import ListCard from './ListCard'
import SearchBar from './SearchBar'
import { MdCancel } from 'react-icons/md'
import FileCard from './FileCard'
import { searchReducer, initialState } from './reducer'

type SearchOverlayProps = {
  onClose: () => void
  sessionToken?: string
  setSideMenuOpen: (state: boolean) => void
}

const SearchOverlay = ({ onClose, sessionToken, setSideMenuOpen }: SearchOverlayProps) => {
  const [state, dispatch] = useReducer(searchReducer, initialState)
  const { query, fileSearch, searching, isFetched, fileResults, results, folderPaths } = state

  useEffect(() => {
    // Add class to body to disable interaction with main page
    document.body.classList.add('overflow-hidden')
    document.body.style.pointerEvents = 'none'

    //search folder directories on mount and map folder id to path
    const getDirectories = async () => {
      try {
        const res = await getDriveDirectories()
        if (res?.files) {
          const folderPaths = buildFolderPaths(res.files)
          dispatch({
            type: 'SET_FOLDER_PATHS',
            payload: folderPaths,
          })
        }
      } catch (error) {
        console.error(error)
      }
    }
    getDirectories()

    return () => {
      document.body.classList.remove('overflow-hidden')
      document.body.style.pointerEvents = 'auto'
    }
  }, [])

  const contentReturned =
    results?.pageData.length > 0 ||
    results?.sectionData.length > 0 ||
    results?.privatePageData.length > 0 ||
    results?.privateSectionData.length > 0

  const filesReturned = fileResults.files?.length && fileResults.files.length > 0

  const clearResults = () => {
    dispatch({ type: 'CLEAR_RESULTS' })
  }

  //search function for content or files depending on fileSearch state
  //append is used to load more files with same query
  const handleSearch = async (queryInput: string, searchFiles = false, append = false) => {
    if (queryInput.length < 2) return
    try {
      dispatch({ type: 'SET_SEARCHING', payload: true })
      if (searchFiles) {
        const resDrive = await searchDrive(
          queryInput,
          //only nextPage if append is true
          append ? (fileResults.nextPageToken ?? undefined) : undefined
        )
        //if append then add to existing files else reset
        if (append) {
          //filter away duplicates
          const filteredFiles = resDrive?.files?.filter((file) => !fileResults.files?.find((f) => f.id === file.id))
          if (resDrive) {
            dispatch({
              type: 'SET_FILE_RESULTS',
              payload: {
                files: [...(fileResults.files ?? []), ...(filteredFiles || [])],
                nextPageToken: resDrive.nextPageToken,
              },
            })
          }
        } else {
          dispatch({
            type: 'SET_FILE_RESULTS',
            payload: resDrive ?? { files: [] },
          })
        }
        dispatch({ type: 'SET_SEARCHING', payload: false })
      } else {
        const res = await searchSiteContent(queryInput, sessionToken)
        dispatch({
          type: 'SET_RESULTS',
          payload: {
            sectionData: res.sectionData,
            pageData: res.pageData,
            privateSectionData: res.privateSectionData,
            privatePageData: res.privatePageData,
          },
        })
        dispatch({ type: 'SET_SEARCHING', payload: false })
      }
      dispatch({ type: 'SET_IS_FETCHED', payload: true })
    } catch (error) {
      dispatch({ type: 'SET_SEARCHING', payload: false })
      console.error(error)
    }
  }

  const debounceTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)

  const debouncedHandleSearch = debounce(handleSearch, 500, debounceTimeout)
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    dispatch({ type: 'INPUT_CHANGED', payload: value })
    if (value && value.length >= 2) {
      debouncedHandleSearch([value, fileSearch])
    }
  }

  const toggleSearchType = () => {
    dispatch({ type: 'TOGGLE_SEARCH_TYPE' })
    handleSearch(query, !fileSearch)
  }

  return (
    <div className="z-50 fixed inset-0 bg-gray-800 bg-opacity-90 flex items-center justify-center bg-darkgray md:p-10 p-5 pt-12 pointer-events-auto overflow-y-auto">
      <Column className="prose w-full h-full">
        <button onClick={onClose} className="absolute top-3 right-3 text-xl">
          <MdCancel size={30} color="white" />
        </button>
        <div className="w-full items-start">
          <SearchBar handleSearch={handleInputChange} query={query} clearResults={clearResults} searching={searching} />
          {sessionToken && (
            <div className="flex text-white mt-4">
              <button
                className={`px-4 py-2 rounded-md ${!fileSearch ? 'bg-teknologröd' : 'bg-gray-500'}`}
                onClick={toggleSearchType}
              >
                Sök nätsidan
              </button>
              <button
                className={`px-4 py-2 rounded-md ${fileSearch ? 'bg-teknologröd' : 'bg-gray-500'}`}
                onClick={toggleSearchType}
              >
                Sök filer
              </button>
            </div>
          )}
          {
            //if query is less than 2 characters and no content or files are returned for the selected search type
            query.length < 2 && ((!contentReturned && !fileSearch) || (!filesReturned && fileSearch)) && !searching && (
              <p className="text-white mt-4 left-0 text-opacity-70">Sök med minst två tecken...</p>
            )
          }
          {
            //if query is valid and no content or files are returned for the selected search type
            isFetched && query.length >= 2 && ((!contentReturned && !fileSearch) || (!filesReturned && fileSearch)) && (
              <>
                {
                  //if searching for content
                  !fileSearch ? (
                    //if logged in show redirect link to file search
                    sessionToken ? (
                      <p className="text-white mt-4 left-0 text-opacity-70">
                        Vill du söka filer?{' '}
                        <span
                          onClick={() => {
                            dispatch({
                              type: 'SET_FILE_SEARCH',
                            })
                            handleSearch(query, true)
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
                    <p className="text-white mt-4 left-0 text-opacity-70">Inga resultat hittades för {query}.</p>
                  )
                }
              </>
            )
          }
        </div>

        <div className="mt-5 w-full pb-12">
          {!fileSearch && (
            <>
              {results.pageData.map((page) => (
                <ListCard
                  key={page.title}
                  title={page.title}
                  setSideMenuOpen={setSideMenuOpen}
                  path={`/${page.category?.slug}/${page.slug}`}
                  onClick={onClose}
                  content={page.content}
                />
              ))}
              {results.sectionData.map(
                (section) =>
                  section.title &&
                  section.content_page && (
                    <ListCard
                      key={section.documentId}
                      title={section.title}
                      setSideMenuOpen={setSideMenuOpen}
                      onClick={onClose}
                      path={`/${section.content_page?.category?.slug}/${section.content_page?.slug}#${titleToAnchor(section.title ?? '')}`}
                      content={section.content}
                    />
                  )
              )}
              {results.privatePageData.map((page) => (
                <ListCard
                  key={page.title}
                  title={page.title}
                  setSideMenuOpen={setSideMenuOpen}
                  path={`/medlem/${page.slug}`}
                  onClick={onClose}
                  content={page.content}
                />
              ))}
              {results.privateSectionData.map(
                (section) =>
                  section.title &&
                  section.private_page && (
                    <ListCard
                      key={section.documentId}
                      title={section.title}
                      setSideMenuOpen={setSideMenuOpen}
                      onClick={onClose}
                      path={`/medlem/${section.private_page?.slug}#${titleToAnchor(section.title ?? '')}`}
                      content={section.content}
                    />
                  )
              )}
            </>
          )}
          {fileSearch && (
            <>
              {fileResults.files?.map(
                (file) =>
                  file.id &&
                  file.name && (
                    <FileCard
                      key={file.id}
                      id={file.id}
                      name={file.name}
                      thumbnailLink={file.thumbnailLink}
                      folderPath={folderPaths.get(file.parents?.[0] ?? '')}
                    />
                  )
              )}
              {fileResults.nextPageToken && (
                <div className="flex justify-center">
                  <button
                    onClick={() => handleSearch(query, true, true)}
                    disabled={searching}
                    className="mt-4 p-2 bg-teknologröd text-white rounded"
                  >
                    {searching ? 'Laddar...' : 'Ladda mera'}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </Column>
    </div>
  )
}

export default SearchOverlay
