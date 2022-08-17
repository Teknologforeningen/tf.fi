import type { GetStaticProps, NextPage } from 'next'
import Timeline from '../components/eventline/Timeline'
import { Event as TimelineEvent } from '../types'
import { useState } from 'react'
import { AvailableLanguages } from '../utils/languages'
import { fetchEvents } from '../lib/api/event'
import { fetchFlags } from '../lib/api/flag'
import { fetchHomepage } from '../lib/api/homepage'
import Header from '../components/header/Header'
import Column from '../components/Column'
import Fundraising from '../components/footer/Fundraising'
import LanguageOptions from '../components/LanguageOptions'
import NationsLogoRow, { NationLogo } from '../components/footer/Logos'

export interface HomePage {
  footer: {
    nationlogos: NationLogo[]
  }
}

interface Props {
  events: TimelineEvent[]
  isHomePage: boolean
  logos: NationLogo[]
}

const Home: NextPage<Props> = ({ events, isHomePage, logos }) => {
  const [horizontalPosition, setHorizontalPosition] = useState(0)
  const [language, setLanguage] = useState<AvailableLanguages>('swedish')

  return (
    <div className="bg-darkblue shadow-[0_0_200px_rgba(0,0,0,0.9)_inset]">
      <Header
        isHomePage={isHomePage}
        language={language}
        setLanguage={setLanguage}
        horizontalPosition={horizontalPosition}
      />

      <Timeline events={events} setHorizontalPosition={setHorizontalPosition} />

      {isHomePage && (
        <footer>
          <Column className={'fundraising-parent'}>
            <Fundraising language={language} />
            <LanguageOptions language={language} setLanguage={setLanguage} />
            <p className={'info-text'}>TEKNOLOGFÖRENINGENS NATIONSFÖRETAG</p>
            <NationsLogoRow nationLogos={logos} />
          </Column>
        </footer>
      )}
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const events = await fetchEvents()
  const flags = await fetchFlags()
  const homepage = await fetchHomepage()
  const logos = homepage.footer.nationlogos
  const isHomePage = flags.some(
    (flag) => flag.title === 'isHomePage' && flag.onoff
  )
  return {
    props: { events, isHomePage, logos },
    revalidate: 60,
  }
}

export default Home
