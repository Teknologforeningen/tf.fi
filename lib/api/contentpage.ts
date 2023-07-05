import qs from 'qs'
import { fetchFromStrapi } from '.'
import { ContentPage } from '../../models/contentpage'

export async function fetchContentPage(slug?: string): Promise<ContentPage> {
  const query = slug
    ? qs.stringify({
        filters: {
          slug: {
            $eq: slug,
          },
        },
      })
    : ''
  const contentPages = await fetchFromStrapi<ContentPage>(
    `/content-pages?${query}`
  )
  if (!(contentPages instanceof Array)) return Promise.reject()
  else if (contentPages.length === 0) return Promise.reject()

  const contentPage = contentPages[0]
  return contentPage.attributes
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

  const res = await fetchFromStrapi<ContentPage>(`/content-pages?${query}`)
  if (!(res instanceof Array)) return Promise.reject()
  return res.map((c) => c.attributes)
}
