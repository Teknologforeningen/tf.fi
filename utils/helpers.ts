import { NationLogo } from '../components/footer/Logos'
import { fetchEvents } from '../lib/api/event'
import { fetchFlags } from '../lib/api/flag'
import { fetchHomepage } from '../lib/api/homepage'
import fetchNavbar, { NavbarLink } from '../lib/api/navbar'
import { Flag } from '../models/flag'
import { Event } from '../models/event'
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
  events: Event[]
  flags: Flag[]
  homepage: HomePage
  navbarLinks: NavbarLink[]
  logos: NationLogo[]
  isHomePage: boolean
}
export const getLayoutProps = async (): Promise<LayoutProps> => {
  const events = await fetchEvents()
  const flags = await fetchFlags()
  const homepage = await fetchHomepage()
  const navbarLinks = await fetchNavbar()
  const logos = homepage.footer.nationlogos
  const isHomePage = flags.some(
    (flag) => flag.title === 'isHomePage' && flag.onoff
  )

  return {
    events,
    flags,
    homepage,
    navbarLinks,
    logos,
    isHomePage,
  }
}
