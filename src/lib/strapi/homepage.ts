import { Homepage } from '../../app/page'
import qs from 'qs'
import { fetchSingle } from '@lib/strapi/index'

export async function fetchHomepage(): Promise<Homepage | null> {
  const query = qs.stringify(
    {
      populate: ['banner', 'banner.bannerImages'],
    },
    { encodeValuesOnly: true }
  )
  const res = await fetchSingle<Homepage>('/homepage', { query })
  return res?.data ?? null
}
