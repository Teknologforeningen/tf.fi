import { drive_v3 } from 'googleapis'
import { SearchData } from '@lib/strapi/search'

type State = {
  query: string
  fileSearch: boolean
  searching: boolean
  isFetched: boolean
  fileResults: drive_v3.Schema$FileList
  results: SearchData
  folderPaths: Map<string, string>
}

type Action =
  | { type: 'SET_FILE_SEARCH' }
  | { type: 'SET_SEARCHING'; payload: boolean }
  | { type: 'SET_IS_FETCHED'; payload: boolean }
  | { type: 'SET_FILE_RESULTS'; payload: drive_v3.Schema$FileList }
  | { type: 'SET_RESULTS'; payload: SearchData }
  | { type: 'CLEAR_RESULTS' }
  | { type: 'TOGGLE_SEARCH_TYPE' }
  | { type: 'INPUT_CHANGED'; payload: string }
  | { type: 'SET_FOLDER_PATHS'; payload: Map<string, string> }

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
  folderPaths: new Map(),
}

export const searchReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_FILE_SEARCH':
      return { ...state, fileSearch: true, isFetched: false }
    case 'SET_SEARCHING':
      return { ...state, searching: action.payload }
    case 'SET_IS_FETCHED':
      return { ...state, isFetched: action.payload }
    case 'SET_FILE_RESULTS':
      return { ...state, fileResults: action.payload }
    case 'SET_RESULTS':
      return { ...state, results: action.payload }
    case 'TOGGLE_SEARCH_TYPE':
      return { ...state, fileSearch: !state.fileSearch, isFetched: false }
    case 'SET_FOLDER_PATHS':
      return { ...state, folderPaths: action.payload }
    case 'INPUT_CHANGED':
      return {
        ...state,
        query: action.payload,
        isFetched: false,
        searching: action.payload.length >= 2,
      }
    case 'CLEAR_RESULTS':
      return {
        ...initialState,
        fileSearch: state.fileSearch,
        folderPaths: state.folderPaths,
      }
    default:
      return state
  }
}
