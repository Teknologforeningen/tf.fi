import type { GetStaticProps, NextPage } from 'next'
import { Event as TimelineEvent } from '../models/event'
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
import TFLogo from '../components/TFLogo/TFLogo'
import BasicInfo from '../components/footer/BasicInfo'

export interface HomePage {
  footer: {
    nationlogos: NationLogo[]
  }
}

type Props = {
  events: TimelineEvent[]
  isHomePage: boolean
  logos: NationLogo[]
  navbarLinks: NavbarLink[]
  namokallelses: Namo[]
}

const Home: NextPage<Props> = ({
  navbarLinks,
  isHomePage,
  logos,
  namokallelses,
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
      <main
        //could not get tailwind to center content
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'white',
          flex: 1,
          height: '100%',
        }}
      >
        <TFLogo />
      </main>
      <footer>
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
    props: { navbarLinks, events, isHomePage, logos, namokallelses },
  }
}

export default Home
