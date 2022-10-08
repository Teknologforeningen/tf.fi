import qs from 'qs'
import { CollectionResponse, fetchFromStrapi } from '.'

// TODO: Change to type alias from AboutPage type
interface NavbarAbout {
  title: string
  slug: string
}

interface BaseNavbarLink {
  title: string
}

export interface NavbarSingleLink extends BaseNavbarLink {
  link: string
}

export interface NavbarMultipleLink extends BaseNavbarLink {
  links: NavbarSingleLink[]
}

export type NavbarLink = NavbarSingleLink | NavbarMultipleLink

export interface Navbar {
  id: number
  abouts: {
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

  const aboutLinks = navbar.attributes.abouts.data.map((about) => ({
    title: about.attributes.title,
    link: `/about/${about.attributes.slug}`,
  }))

  const about: NavbarMultipleLink = {
    title: 'Om Teknologföreningen',
    links: aboutLinks,
  }

  return [about, ...navbar.attributes.links]
}
