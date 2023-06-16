import type { GetStaticProps, NextPage } from 'next'
import { useState } from 'react'
import { AvailableLanguages } from '../utils/languages'
import { fetchEvents } from '../lib/api/event'
import { fetchFlags } from '../lib/api/flag'
import { fetchHomepage } from '../lib/api/homepage'
import { fetchNamokallelse } from '../lib/api/namokallelse'
import Column from '../components/Column'
import NationsLogoRow, { NationLogo } from '../components/footer/Logos'
import fetchNavbar, { NavbarLink } from '../lib/api/navbar'
import Namokallelses, { Namo } from '../components/Namokallelse'
import TFLogo from '../components/TFLogo'
import BasicInfo from '../components/footer/BasicInfo'
import Header from '../components/header'

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
      <Header
        navbarLinks={navbarLinks}
        isHomePage={isHomePage}
        language={language}
        setLanguage={setLanguage}
      />
      <main
        //could not get tailwind to center content so using inline style
        className="flex h-full min-h-[55vh] flex-1 items-center justify-center bg-white"
      >
        <TFLogo />
      </main>
      <footer className="bottom-0 left-0 w-full">
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
