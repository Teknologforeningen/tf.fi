import type { GetServerSideProps, NextPage } from 'next'

import TF150Logo from '../components/TF150LogoUtanText'
import TF150LogoText from '../components/TF150LogoBaraText'
import Timeline from '../components/eventline/Timeline'
import { Event as TimelineEvent } from '../types'
import Navbar from '../components/navbar/Navbar'
import Info from '../components/bottom/Info'
import Column from '../components/Column'
import useWindowSize from '../hooks/useWindowSize'
import { useState } from 'react'
import { AvailableLanguages } from '../utils/languages'
import { fetchEvents } from '../services/eventService'
import { fetchFlags } from '../services/flagService'

interface Props {
  events: TimelineEvent[]
  isHomePage: boolean
}

const Home: NextPage<Props> = ({ events, isHomePage }) => {
  const { width, isMobile } = useWindowSize()
  const [horizontalPosition, setHorizontalPositition] = useState(0)
  const [language, setLanguage] = useState<AvailableLanguages>('swedish')

  return (
    <div style={{ display: 'flex' }}>
      <div className={'main-body'}>
        {isHomePage && (
          <Navbar
            isMobile={isMobile}
            language={language}
            setLanguage={setLanguage}
          />
        )}
        <Column>
          <div className={'logo'} style={{ position: 'relative' }}>
            <TF150Logo
              width={width}
              isMobile={isMobile}
              degrees={horizontalPosition / 10}
            />
            <TF150LogoText
              width={width}
              isMobile={isMobile}
              style={{ position: 'absolute', top: '39%', left: '24%' }}
            />
          </div>
          <Timeline
            events={events}
            setHorizontalPosition={setHorizontalPositition}
          />
          {isHomePage && (
            <Info
              isMobile={isMobile}
              language={language}
              setLanguage={setLanguage}
            />
          )}
        </Column>
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const events = await fetchEvents()
  const flags = await fetchFlags()
  const isHomePage = flags.some(
    (flag) => flag.title === 'isHomePage' && flag.onoff
  )
  return {
    props: {
      events: events,
      isHomePage,
    },
  }
}

export default Home
