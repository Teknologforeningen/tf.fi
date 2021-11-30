import type { GetServerSideProps, NextPage } from 'next'
import TF150Logo from '../components/TF150Logo'
import Timeline from '../components/eventline/Timeline'
import { Event } from '../types'
import Navbar from '../components/navbar/Navbar'
import Info from '../components/bottom/Info'
import Column from '../components/Column'

interface Props {
  events: Event[]
  isHomePage: boolean
}

const Home: NextPage<Props> = ({ events, isHomePage }) => {
  return (
    <div style={{ display: 'flex' }}>
      <div className={'main-body'} style={{ height: '100%' }}>
        {isHomePage && <Navbar />}
        <Column>
          <div className={'logo'}>
            <TF150Logo />
          </div>
          <Timeline events={events} />
        </Column>
        {isHomePage && <Info />}
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  // Get posts from API
  const res = await fetch(`${process.env.BACKEND_URL}/events`)
  const events = await res.json()
  return {
    props: {
      events: events,
      isHomePage: process.env.ISHOMEPAGE === 'true',
    },
  }
}

export default Home
