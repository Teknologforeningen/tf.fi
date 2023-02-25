import qs from 'qs'
import { fetchFromStrapi } from '.'

export interface AboutPage {
  content: string
  title: string
  sidebar: string | null
  slug: string
  locale: string
}

export async function fetchAboutPage(
  slug?: string,
  locale = 'sv-FI'
): Promise<AboutPage | undefined> {
  const query = slug
    ? qs.stringify({
        filters: {
          slug: {
            $eq: slug,
          },
        },
        locale,
      })
    : ''

  const aboutPages = await fetchFromStrapi<AboutPage>(`/about-pages?${query}`)
  return aboutPages[0]?.attributes
}

export async function fetchAboutPages(): Promise<AboutPage[]> {
  const res = await fetchFromStrapi<AboutPage>('/about-pages')
  return res.map((e) => e.attributes)
}
