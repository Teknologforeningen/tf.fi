import { HomePage } from '../../pages'
import qs from 'qs'
import strapi from './strapi'

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
  const res = await strapi.fetchSingle<HomePage>('/homepage', { query })
  return res?.data?.attributes ?? null
}
