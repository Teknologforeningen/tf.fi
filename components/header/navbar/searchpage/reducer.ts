import { drive_v3 } from 'googleapis'
import { SearchData } from '@lib/strapi/search'

type State = {
  query: string
  fileSearch: boolean
  searching: boolean
  isFetched: boolean
  fileResults: drive_v3.Schema$FileList
  results: SearchData
}

type Action =
  | { type: 'SET_QUERY'; payload: string }
  | { type: 'SET_FILE_SEARCH'; payload: boolean }
  | { type: 'SET_SEARCHING'; payload: boolean }
  | { type: 'SET_IS_FETCHED'; payload: boolean }
  | { type: 'SET_FILE_RESULTS'; payload: drive_v3.Schema$FileList }
  | { type: 'SET_RESULTS'; payload: SearchData }
  | { type: 'CLEAR_RESULTS' }
  | {
      type: 'APPEND_FILE_RESULTS'
      payload: { filteredFiles: drive_v3.Schema$File[]; nextPageToken: string }
    }

export const initialState: State = {
  query: '',
  fileSearch: false,
  searching: false,
  isFetched: false,
  fileResults: { files: [] },
  results: {
    sectionData: [],
    pageData: [],
    privateSectionData: [],
    privatePageData: [],
  },
}

export const searchReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_QUERY':
      return { ...state, query: action.payload }
    case 'SET_FILE_SEARCH':
      return { ...state, fileSearch: action.payload }
    case 'SET_SEARCHING':
      return { ...state, searching: action.payload }
    case 'SET_IS_FETCHED':
      return { ...state, isFetched: action.payload }
    case 'SET_FILE_RESULTS':
      return { ...state, fileResults: action.payload }
    case 'SET_RESULTS':
      return { ...state, results: action.payload }
    case 'APPEND_FILE_RESULTS':
      return {
        ...state,
        fileResults: {
          files: [
            ...(state.fileResults.files ?? []),
            ...(action.payload.filteredFiles || []),
          ],
          nextPageToken: action.payload.nextPageToken,
        },
      }
    case 'CLEAR_RESULTS':
      return { ...initialState, fileSearch: state.fileSearch }
    default:
      return state
  }
}
