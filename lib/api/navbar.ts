import qs from 'qs'
import { ContentPage } from '@models/contentpage'
import { Category } from '@models/category'
import strapi, { CollectionResponse, SingleResponse } from '@lib/api/strapi'

type NavbarCategory = Pick<Category, 'content_pages' | 'slug' | 'title'>

interface BaseNavbarLink {
  title: string
}

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
          populate: ['name', 'slug', 'content_pages'],
        },
      },
    },
    { encodeValuesOnly: true }
  )
  const res = await strapi.fetchSingle<Navbar>('/navbar', { query })

  if (res === null || res?.data === null) return []

  const categories = toNavbarMultipleLink(res.data.attributes.categories.data)
  return [...categories, ...res.data.attributes.links]
}

function toLink(
  contentPage: SingleResponse<ContentPage>,
  baseUrl: string
): NavbarSingleLink {
  return {
    title: contentPage.attributes.title,
    link: `/${baseUrl}/${contentPage.attributes.slug}`,
  }
}

function toNavbarMultipleLink(
  categories: CollectionResponse<NavbarCategory>
): NavbarMultipleLink[] {
  return categories.map((category) => {
    const links = category.attributes.content_pages.data.map((page) => {
      return toLink(page, category.attributes.slug)
    })
    return {
      title: category.attributes.title,
      links,
      basePath: category.attributes.slug,
    }
  })
}
