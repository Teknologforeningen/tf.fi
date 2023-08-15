import qs from 'qs'
import { PageType } from '@models/page'
import { fetchCollection, fetchCollectionSingle } from '@lib/api/strapi'

export async function fetchPrivatePage(
  slug?: string
): Promise<PageType | null> {
  if (slug === undefined) return null
  const query = qs.stringify({
    populate: {
      sections: {
        populate: ['title', 'content', 'file_folders'],
        sort: 'title',
      },
    },
  })

  const res = await fetchCollectionSingle<PageType>('/private-pages', slug, {
    query,
  })
  return res?.data?.attributes ?? null
}

export async function fetchPrivatePages(): Promise<PageType[]> {
  const res = await fetchCollection<PageType>('/private-pages')
  return res?.data?.map((c) => c.attributes) ?? []
}
