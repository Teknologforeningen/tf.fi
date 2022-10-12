import qs from 'qs'
import { fetchFromStrapi } from '.'

interface Sidebar {
  content: string
}

export interface AbiPage {
  slug: string
  title: string
  content: string
  leftSidebar: Sidebar | null
  rightSidebar: Sidebar | null
  locale: string
}

export async function fetchAbiPage(slug?: string): Promise<AbiPage> {
  const query = slug
    ? qs.stringify({
        filters: {
          slug: {
            $eq: slug,
          },
        },
        populate: '*',
      })
    : ''
  const abiPages = await fetchFromStrapi<AbiPage>(`/abi-pages?${query}`)
  if (!(abiPages instanceof Array)) return Promise.reject()
  else if (abiPages.length === 0) return Promise.reject()

  const abiPage = abiPages[0]
  return abiPage.attributes
}

export async function fetchAbiPages(): Promise<AbiPage[]> {
  const res = await fetchFromStrapi<AbiPage>('/abi-pages')
  if (!(res instanceof Array)) return Promise.reject()
  return res.map((e) => e.attributes)
}
