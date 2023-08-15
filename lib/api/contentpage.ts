import qs from 'qs'
import { ContentPage } from '@models/contentpage'
import strapi from '@lib/api/strapi'

export async function fetchContentPage(
  slug?: string
): Promise<ContentPage | null> {
  if (slug === undefined) return null
  const query = qs.stringify({
    populate: {
      content_sections: {
        populate: ['title', 'content', 'file_folders'],
        sort: 'title',
      },
    },
  })

  const res = await strapi.fetchCollectionSingle<ContentPage>(
    '/content-pages',
    slug,
    {
      query,
    }
  )
  return res?.data?.attributes ?? null
}

export async function fetchContentPages(): Promise<ContentPage[]> {
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

  const res = await strapi.fetchCollection<ContentPage>('/content-pages', {
    query,
  })
  return res?.data?.map((c) => c.attributes) ?? []
}
