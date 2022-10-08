import qs from 'qs'
import { fetchFromStrapi } from '.'

export interface AboutPage {
  content: string
  title: string
  sidebar: string | null
  slug: string
  locale: string
}

export async function fetchAboutPage(slug?: string): Promise<AboutPage> {
  const query = slug
    ? qs.stringify({
        filters: {
          slug: {
            $eq: slug,
          },
        },
      })
    : ''
  const aboutPages = await fetchFromStrapi<AboutPage>(`/about-pages?${query}`)
  if (!(aboutPages instanceof Array)) return Promise.reject()
  else if (aboutPages.length === 0) return Promise.reject()

  const aboutPage = aboutPages[0]
  return aboutPage.attributes
}

export async function fetchAboutPages(): Promise<AboutPage[]> {
  const res = await fetchFromStrapi<AboutPage>('/about-pages')
  if (!(res instanceof Array)) return Promise.reject()
  return res.map((e) => e.attributes)
}
