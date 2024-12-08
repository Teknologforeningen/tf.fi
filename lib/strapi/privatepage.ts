import qs from 'qs'
import { PageType } from '@models/page'
import { fetchCollection, fetchSingle } from '@lib/strapi/index'

export async function fetchPrivatePage(
  sessionToken?: string,
  slug?: string
): Promise<PageType | null> {
  if (slug === undefined || sessionToken === undefined) return null
  const query = qs.stringify({
    populate: {
      sections: {
        populate: ['title', 'content', 'file_folders'],
      },
    },
  })

  const res = await fetchSingle<PageType>(`/private-pages/${slug}`, {
    query,
    headers: { Authorization: `Bearer ${sessionToken}` },
  })

  return res?.data ?? null
}

export async function fetchPrivatePages(
  sessionToken: string
): Promise<PageType[]> {
  const res = await fetchCollection<PageType>('/private-pages', {
    headers: { Authorization: `Bearer ${sessionToken}` },
  })
  return res?.data ?? []
}
