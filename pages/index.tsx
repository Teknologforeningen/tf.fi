import type { GetStaticProps, NextPage } from 'next'
import Image from 'next/image'
import { useState } from 'react'
import { AvailableLanguages } from '../utils/languages'
import { fetchEvents } from '../lib/api/event'
import { fetchFlags } from '../lib/api/flag'
import { fetchHomepage } from '../lib/api/homepage'
import Column from '../components/Column'
import  { NationLogo } from '../components/footer/Logos'
import fetchNavbar, { NavbarLink } from '../lib/api/navbar'
import Header from '../components/header'
import Item from '../components/Item'
import Calendar from '../components/calendar/calendar'
import { Event } from '../models/event'
import MainBanner from '../components/mainBanner'
import TFInfo from '../components/tfInfo'
import Events from '../components/events/events'
import Row from '../components/Row'
import Footer from '../components/footer/footer'

export interface HomePage {
  footer: {
    nationlogos: NationLogo[]
  }
}

type Props = {
  isHomePage: boolean
  logos: NationLogo[]
  navbarLinks: NavbarLink[]
  events: Event[]
}

const Home: NextPage<Props> = ({ navbarLinks, isHomePage, logos, events }) => {
  const [language, setLanguage] = useState<AvailableLanguages>('swedish')
  return (
    <>
      <header>
        <Header
          navbarLinks={navbarLinks}
          isHomePage={isHomePage}
          language={language}
          setLanguage={setLanguage}
        />
      </header>

      <main>
        <Column>
          <MainBanner />
          <Item
            backgroundColor="darkgray"
            className="max-w-[1500px] flex-col md:flex-row"
          >
            <Events events={events.slice(0, 5)} />
            <Calendar />
          </Item>
          <Row className="w-full overflow-hidden">
            <Image
              src={`/images/banner/0.jpg`}
              alt="jeej"
              height={500}
              width={1000}
              style={{ objectFit: 'cover' }}
            />
            <Image
              src={`/images/banner/1.jpg`}
              alt="jeej"
              height={500}
              width={1000}
              style={{ objectFit: 'cover' }}
            />
          </Row>
          <Item backgroundColor="white">
            <TFInfo />
          </Item>
        </Column>
      </main>
      <footer>
        <Footer logos={logos} />
      </footer>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const events = await fetchEvents()
  const flags = await fetchFlags()
  const homepage = await fetchHomepage()
  const navbarLinks = await fetchNavbar()
  const logos = homepage.footer.nationlogos
  const isHomePage = flags.some(
    (flag) => flag.title === 'isHomePage' && flag.onoff
  )
  return {
    props: {
      navbarLinks,
      events,
      isHomePage,
      logos,
    },
  }
}

export default Home
