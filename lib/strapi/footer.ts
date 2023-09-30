import { FooterType } from '@components/footer'
import qs from 'qs'
import { fetchSingle } from '@lib/strapi/index'

export async function fetchFooter(): Promise<FooterType | null> {
  const query = qs.stringify(
    {
      populate: ['nationlogos', 'nationlogos.image'],
    },
    { encodeValuesOnly: true }
  )
  const res = await fetchSingle<FooterType>('/footer', {
    query,
    tags: ['footer'],
  })
  return res?.data?.attributes ?? null
}
