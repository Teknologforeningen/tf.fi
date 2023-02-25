import { HomePage } from '../../pages'
import qs from 'qs'
import { API_URL } from './index'

export async function fetchHomepage(locale?: string): Promise<HomePage> {
  locale = locale ?? 'sv-FI'
  const query = qs.stringify(
    {
      populate: ['footer', 'footer.nationlogos', 'footer.nationlogos.image'],
      locale,
    },
    { encodeValuesOnly: true }
  )
  const res = await fetch(`${API_URL}/homepage?${query}`)
  return res.json().then((j) => j.data.attributes)
}
