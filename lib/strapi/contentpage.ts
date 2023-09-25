import qs from 'qs'
import { PageType } from '@models/page'
import { fetchCollection, fetchCollectionSingle } from '@lib/strapi/index'

export async function fetchContentPage(
  slug?: string
): Promise<PageType | null> {
  if (slug === undefined) return null
  const query = qs.stringify({
    populate: {
      sections: {
        populate: ['title', 'content', 'file_folders'],
      },
      category: {
        populate: ['slug'],
      },
    },
  })

  const res = await fetchCollectionSingle<PageType>('/content-pages', slug, {
    query,
  })
  return res?.data?.attributes ?? null
}

export async function fetchContentPages(): Promise<PageType[]> {
  const query = qs.stringify(
    {
      populate: {
        category: {
          populate: ['slug'],
        },
      },
    },
    { encodeValuesOnly: true }
  )

  const res = await fetchCollection<PageType>('/content-pages', {
    query,
  })
  return res?.data?.map((c) => c.attributes) ?? []
}
