import qs from 'qs'
import { CollectionResponse, fetchFromStrapi } from '.'
import { AboutPage } from './about'

type NavbarAbout = Pick<AboutPage, 'slug' | 'title'>

interface BaseNavbarLink {
  title: string
}

export interface NavbarSingleLink extends BaseNavbarLink {
  link: string
}

export interface NavbarMultipleLink extends BaseNavbarLink {
  links: NavbarSingleLink[]
  // TODO: Make required
  basePath?: string
}

export type NavbarLink = NavbarSingleLink | NavbarMultipleLink

export interface Navbar {
  id: number
  abouts: {
    data: CollectionResponse<NavbarAbout>[]
  }
  abi_pages: {
    data: CollectionResponse<NavbarAbout>[]
  }
  staelm_pages: {
    data: CollectionResponse<NavbarAbout>[]
  }
  links: NavbarLink[]
}

export default async function fetchNavbar(): Promise<NavbarLink[]> {
  const query = qs.stringify(
    {
      populate: {
        logo: {
          populate: ['url'],
        },
        abouts: {
          fields: ['title', 'slug'],
        },
        abi_pages: {
          fields: ['title', 'slug'],
        },
        staelm_pages: {
          fields: ['title', 'slug'],
        },
        links: {
          populate: ['links'],
        },
      },
    },
    { encodeValuesOnly: true }
  )
  const navbar = (await fetchFromStrapi<Navbar>(
    `/navbar?${query}`
  )) as CollectionResponse<Navbar>

  const about = toNavbarMultipleLink(
    navbar.attributes.abouts.data,
    'about',
    'Om Teknologföreningen'
  )

  const abi = toNavbarMultipleLink(
    navbar.attributes.abi_pages.data,
    'abi',
    'Abiturienter'
  )

  /* const stalm = toNavbarMultipleLink(
    navbar.attributes.staelm_pages.data,
    'stalm',
    'Stälmar'
  ) */

  return [about, abi, ...navbar.attributes.links]
}

function toLink(
  cr: CollectionResponse<NavbarAbout>,
  baseUrl: string
): NavbarSingleLink {
  return {
    title: cr.attributes.title,
    link: `/${baseUrl}/${cr.attributes.slug}`,
  }
}

function toNavbarMultipleLink(
  crs: CollectionResponse<NavbarAbout>[],
  baseUrl: string,
  title: string
): NavbarMultipleLink {
  const links = crs.map((about) => toLink(about, baseUrl))
  return {
    title,
    links,
    basePath: baseUrl,
  }
}
