import qs from 'qs'
import { PageType } from '@models/page'
import { Category } from '@models/category'
import { CollectionResponse, fetchSingle, SingleResponse } from '@lib/strapi'

type NavbarCategory = Pick<Category, 'content_pages' | 'slug' | 'title'>

interface BaseNavbarLink {
  title: string
}

type SanitizedPage = Pick<PageType, 'slug' | 'title'>

export interface NavbarSingleLink extends BaseNavbarLink {
  link: string
}

export interface NavbarMultipleLink extends BaseNavbarLink {
  links: NavbarSingleLink[]
  basePath: string
}

export type NavbarLink = NavbarSingleLink | NavbarMultipleLink

export interface Navbar {
  id: number
  links: NavbarLink[]
  categories: CollectionResponse<NavbarCategory>
  private_pages: CollectionResponse<SanitizedPage>
}

export default async function fetchNavbar(): Promise<NavbarLink[]> {
  const query = qs.stringify(
    {
      populate: {
        links: {
          populate: '*',
        },
        categories: {
          populate: {
            content_pages: {
              fields: ['slug', 'title'],
            },
          },
        },
        private_pages: {
          fields: ['title', 'slug'],
        },
      },
    },
    { encodeValuesOnly: true }
  )
  const res = await fetchSingle<Navbar>('/navbar', {
    query,
    tags: ['navbar'],
  })

  if (res === null || res?.data === null) return []

  const categories = categoriesToLinks(res.data.categories)

  const privatePages = toNavbarMultipleLink(
    'För medlemmar',
    'medlem',
    res.data.private_pages
  )
  return [...categories, ...res.data.links, privatePages]
}

function toLink(
  page: SingleResponse<PageType | SanitizedPage>,
  baseUrl: string
): NavbarSingleLink {
  return {
    title: page.title,
    link: `/${baseUrl}/${page.slug}`,
  }
}

function toNavbarMultipleLink(
  title: string,
  basePath: string,
  pages: CollectionResponse<PageType | SanitizedPage>
): NavbarMultipleLink {
  const links = pages.map((page) => toLink(page, basePath))
  return {
    title,
    links,
    basePath,
  }
}

function categoriesToLinks(
  categories: CollectionResponse<NavbarCategory>
): NavbarMultipleLink[] {
  return categories.map((category) => {
    return toNavbarMultipleLink(
      category.title,
      category.slug,
      category.content_pages
    )
  })
}
