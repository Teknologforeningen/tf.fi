import qs from 'qs'
import { PageType } from '@models/page'
import { Category } from '@models/category'
import strapi, { CollectionResponse, SingleResponse } from '@lib/api/strapi'

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
  categories: {
    data: CollectionResponse<NavbarCategory>
  }
  private_pages: {
    data: CollectionResponse<SanitizedPage>
  }
}

export default async function fetchNavbar(): Promise<NavbarLink[]> {
  const query = qs.stringify(
    {
      populate: {
        logo: {
          populate: ['url'],
        },
        links: {
          populate: ['links'],
        },
        categories: {
          populate: {
            content_pages: {
              fields: ['slug', 'title'],
            },
          },
        },
        private_pages: {
          populate: ['title', 'slug'],
        },
      },
    },
    { encodeValuesOnly: true }
  )
  const res = await strapi.fetchSingle<Navbar>('/navbar', { query })

  if (res === null || res?.data === null) return []

  const categories = categoriesToLinks(res.data.attributes.categories.data)

  const privatePages = toNavbarMultipleLink(
    'För medlemmar',
    'medlem',
    res.data.attributes.private_pages
  )
  // Temporarily removed links while testing with prod CMS, to be added back
  // when links to other pages start using the .links attribute
  // return [...categories, ...res.data.attributes.links, privatePages]
  return [...categories, privatePages]
}

function toLink(
  page: SingleResponse<PageType | SanitizedPage>,
  baseUrl: string
): NavbarSingleLink {
  return {
    title: page.attributes.title,
    link: `/${baseUrl}/${page.attributes.slug}`,
  }
}

function toNavbarMultipleLink(
  title: string,
  basePath: string,
  pages: { data: CollectionResponse<PageType | SanitizedPage> }
): NavbarMultipleLink {
  const links = pages.data.map((page) => {
    return toLink(page, basePath)
  })
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
      category.attributes.title,
      category.attributes.slug,
      category.attributes.content_pages
    )
  })
}
