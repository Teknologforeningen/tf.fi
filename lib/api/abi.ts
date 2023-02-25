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

export async function fetchAbiPage(
  slug?: string,
  locale?: string
): Promise<AbiPage | undefined> {
  locale = locale ?? 'sv-FI'
  const query = slug
    ? qs.stringify({
        filters: {
          slug: {
            $eq: slug,
          },
        },
        populate: '*',
        locale,
      })
    : ''

  const abiPages = await fetchFromStrapi<AbiPage>(`/abi-pages?${query}`)
  return abiPages[0]?.attributes
}

export async function fetchAbiPages(): Promise<AbiPage[]> {
  const res = await fetchFromStrapi<AbiPage>('/abi-pages')
  return res.map((e) => e.attributes)
}
