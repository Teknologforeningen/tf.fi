import { HomePage } from '../../pages'
import qs from 'qs'
import { fetchSingle } from './strapi'

export async function fetchHomepage(): Promise<HomePage | null> {
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
  const res = await fetchSingle<HomePage>('/homepage', { query })
  return res?.data?.attributes ?? null
}
