import type { GetStaticProps, NextPage } from 'next'
import Timeline from '../components/eventline/Timeline'
import { Event as TimelineEvent } from '../types'
import { useState } from 'react'
import { AvailableLanguages } from '../utils/languages'
import { fetchEvents } from '../lib/api/event'
import { fetchFlags } from '../lib/api/flag'
import Header from '../components/header/Header'
import Footer from '../components/footer/Footer'

interface Props {
  events: TimelineEvent[]
  isHomePage: boolean
}

const Home: NextPage<Props> = ({ events, isHomePage }) => {
  const [horizontalPosition, setHorizontalPosition] = useState(0)
  const [language, setLanguage] = useState<AvailableLanguages>('swedish')

  return (
    <div className={'main-body'}>
      <Header
        isHomePage={isHomePage}
        language={language}
        setLanguage={setLanguage}
        horizontalPosition={horizontalPosition}
      />

      <Timeline events={events} setHorizontalPosition={setHorizontalPosition} />

      <Footer
        isHomePage={isHomePage}
        language={language}
        setLanguage={setLanguage}
      />
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
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
    revalidate: 60,
  }
}

export default Home
