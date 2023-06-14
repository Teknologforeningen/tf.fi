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
import TFInfo from '../components/tfInfo'
import Item from '../components/Item'

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
        <Column>
          <MainBanner />
          <Item backgroundColor="darkgray">
            <Events
              events={events.filter((e) => e.type === 'blogpost' || !e.type)}
              title="Nyheter"
            />
          </Item>
          <Item backgroundColor="gray">
            <Events
              events={events.filter((e) => e.type === 'event')}
              title="Anslagstavlan"
            />
          </Item>
          <Item>
            <Calendar />
          </Item>
          <Item backgroundColor="white">
            <TFInfo />
          </Item>
        </Column>
      </main>
      <footer>
        {/*<LanguageOptions language={language} setLanguage={setLanguage} />*/}
        <Column className="sticky bottom-0 w-full bg-darkgray py-5">
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
