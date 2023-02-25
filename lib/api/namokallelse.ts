import { fetchFromStrapi } from './index'
import { Namo } from '../../components/namokallese/Namokallelse'

export async function fetchNamokallelse(): Promise<Namo[]> {
  const res = await fetchFromStrapi<Namo>('/namokallelses')
  return res.map((f) => ({ id: f.id, ...f.attributes }))
}
