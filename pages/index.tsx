import type { GetServerSideProps, NextPage } from 'next'

import Timeline from '../components/eventline/Timeline'
import { Event as TimelineEvent } from '../types'
import useWindowSize from '../hooks/useWindowSize'
import { useState } from 'react'
import { AvailableLanguages } from '../utils/languages'
import { fetchEvents } from '../api/eventApi'
import { fetchFlags } from '../api/flagApi'
import Header from '../components/header/Header'
import Footer from '../components/footer/Footer'

interface Props {
  events: TimelineEvent[]
  isHomePage: boolean
}

const Home: NextPage<Props> = ({ events, isHomePage }) => {
  const { isMobile } = useWindowSize()
  const [horizontalPosition, setHorizontalPositition] = useState(0)
  const [language, setLanguage] = useState<AvailableLanguages>('swedish')

  return (
    <div style={{ display: 'flex' }}>
      <div className={'main-body'}>
        <Header
          isHomePage={isHomePage}
          language={language}
          setLanguage={setLanguage}
          horizontalPosition={horizontalPosition}
        />

        <Timeline
          events={events}
          setHorizontalPosition={setHorizontalPositition}
        />

        <Footer
          isHomePage={isHomePage}
          isMobile={isMobile}
          language={language}
          setLanguage={setLanguage}
        />
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
