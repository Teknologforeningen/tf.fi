import { Flag } from '../../types'
import { fetchMultiple } from './index'

export async function fetchFlags(): Promise<Flag[]> {
  return fetchMultiple<Flag>('/flags')
}
