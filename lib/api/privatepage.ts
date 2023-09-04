import qs from 'qs'
import { PageType } from '@models/page'
import strapi from '@lib/api/strapi'

export async function fetchPrivatePage(
  sessionToken: string,
  slug?: string
): Promise<PageType | null> {
  if (slug === undefined) return null
  const query = qs.stringify({
    populate: {
      sections: {
        populate: ['title', 'content', 'file_folders'],
      },
    },
  })

  const res = await strapi.fetchSingle<PageType>(`/private-pages/${slug}`, {
    query,
    headers: { Authorization: `Bearer ${sessionToken}` },
  })
  return res?.data?.attributes ?? null
}

export async function fetchPrivatePages(
  sessionToken: string
): Promise<PageType[]> {
  const res = await strapi.fetchCollection<PageType>('/private-pages', {
    headers: { Authorization: `Bearer ${sessionToken}` },
  })
  return res?.data?.map((c) => c.attributes) ?? []
}
