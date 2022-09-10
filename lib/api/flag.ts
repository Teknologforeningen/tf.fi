import { Flag } from '../../models/flag'
import { fetchFromStrapi } from './index'

export async function fetchFlags(): Promise<Flag[]> {
  const res = await fetchFromStrapi<Flag>('/flags')
  return res.map((f) => ({ id: f.id, ...f.attributes }))
}
