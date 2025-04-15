import qs from 'qs'
import { PageType } from '@models/page'
import { fetchCollection, fetchCollectionSingle } from '@lib/strapi/index'

export async function fetchContentPage(slug?: string): Promise<PageType | null> {
  if (slug === undefined) return null
  const query = qs.stringify({
    populate: {
      sections: {
        fields: ['title', 'content'],
        populate: ['file_folders'],
      },
      category: {
        fields: ['slug'],
      },
    },
  })

  const res = await fetchCollectionSingle<PageType>('/content-pages', slug, {
    query,
  })
  return res?.data ?? null
}

export async function fetchContentPages(): Promise<PageType[]> {
  const query = qs.stringify(
    {
      populate: {
        category: {
          fields: ['slug'],
        },
      },
    },
    { encodeValuesOnly: true }
  )

  const res = await fetchCollection<PageType>('/content-pages', { query })
  return res?.data ?? []
}
