import { Flag } from '../types'
import { fetchMultiple } from './fetchService'

export async function fetchFlags(): Promise<Flag[]> {
  return fetchMultiple<Flag>('/flags')
}
