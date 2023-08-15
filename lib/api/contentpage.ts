import qs from 'qs'
import { PageType } from '@models/page'
import strapi from '@lib/api/strapi'

export async function fetchContentPage(
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

  const res = await strapi.fetchCollectionSingle<PageType>(
    '/content-pages',
    slug,
    {
      query,
    }
  )
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

  const res = await strapi.fetchCollection<PageType>('/content-pages', {
    query,
  })
  return res?.data?.map((c) => c.attributes) ?? []
}
