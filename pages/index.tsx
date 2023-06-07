import type { GetStaticProps, NextPage } from 'next'
import { useState } from 'react'
import { AvailableLanguages } from '../utils/languages'
import { fetchEvents } from '../lib/api/event'
import { fetchFlags } from '../lib/api/flag'
import { fetchHomepage } from '../lib/api/homepage'
import { fetchNamokallelse } from '../lib/api/namokallelse'
import Header from '../components/header/Header'
import Column from '../components/Column'
import NationsLogoRow, { NationLogo } from '../components/footer/Logos'
import fetchNavbar, { NavbarLink } from '../lib/api/navbar'
import Namokallelses, { Namo } from '../components/namokallese/Namokallelse'
import MainBanner from '../components/mainBanner'
import BasicInfo from '../components/footer/BasicInfo'
import Calendar from '../components/calendar/calendar'
import Events from '../components/events/events'
import { calendar_v3 } from 'googleapis'
import { Event } from '../models/event'

export interface HomePage {
  footer: {
    nationlogos: NationLogo[]
  }
}

type Props = {
  isHomePage: boolean
  logos: NationLogo[]
  navbarLinks: NavbarLink[]
  namokallelses: Namo[]
  calendarEvents: calendar_v3.Schema$Event[]
  events: Event[]
}

const Home: NextPage<Props> = ({
  navbarLinks,
  isHomePage,
  logos,
  namokallelses,
  events,
}) => {
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
        <MainBanner />
        <div className="flex flex-col md:flex-row">
          <Events events={events} />
          <Calendar />
        </div>
      </main>
      <footer
        style={{
          left: 0,
          bottom: 0,
          width: '100%',
        }}
      >
        {/*<LanguageOptions language={language} setLanguage={setLanguage} />*/}
        <Column className="sticky bottom-0 w-full bg-darkgray pb-5">
          <NationsLogoRow nationLogos={logos} />
          <BasicInfo />
          <Namokallelses namokallelses={namokallelses} />
        </Column>
      </footer>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const events = await fetchEvents()
  const flags = await fetchFlags()
  const homepage = await fetchHomepage()
  const navbarLinks = await fetchNavbar()
  const namokallelses = await fetchNamokallelse()
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
      namokallelses,
    },
  }
}

export default Home
