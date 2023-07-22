import { HomePage } from '../../pages'
import qs from 'qs'
import { API_URL } from './index'

export async function fetchHomepage(): Promise<HomePage> {
  const query = qs.stringify(
    {
      populate: [
        'banner',
        'banner.bannerImages',
        'footer',
        'footer.nationlogos',
        'footer.nationlogos.image',
      ],
    },
    { encodeValuesOnly: true }
  )
  const res = await fetch(`${API_URL}/homepage?${query}`)
  return res.json().then((j) => j.data.attributes)
}
