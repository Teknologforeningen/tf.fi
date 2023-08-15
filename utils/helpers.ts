import { NationLogo } from '@components/footer/Logos'
import { fetchHomepage } from '@lib/api/homepage'
import fetchNavbar, { NavbarLink } from '../lib/api/navbar'
import { HomePage } from '../pages'

export const getDateLong = (date: Date | string): string =>
  new Date(date).toLocaleDateString('sv-SE', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

export const getDateShort = (date: Date | string): string =>
  new Date(date).toLocaleDateString('fi-FI', {
    dateStyle: 'short',
  })

export type LayoutProps = {
  homepage: HomePage | null
  navbarLinks: NavbarLink[]
  logos: NationLogo[]
}
export const getLayoutProps = async (): Promise<LayoutProps> => {
  const homepage = await fetchHomepage()
  const navbarLinks = await fetchNavbar()
  const logos = homepage?.footer?.nationlogos ?? []

  return {
    homepage,
    navbarLinks,
    logos,
  }
}

export const titleToAnchor = (title: string) => {
  return title
    .replace(/ /g, '-')
    .replace(/[\/\\^$*+?.()|\[\]{}<>:;"'~,=@`#!%&]/g, '')
    .toLowerCase()
}
