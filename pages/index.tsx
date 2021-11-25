import type { GetServerSideProps, NextPage } from 'next'
import TF150Logo from '../components/TF150Logo'
import Timeline from '../components/eventline/Timeline'
import { Event } from '../types'
import Navbar from '../components/navbar/Navbar'
import Info from '../components/bottom/Info'

interface Props {
  events: Event[]
  isHomePage: Boolean
}

const Home: NextPage<Props> = ({ events, isHomePage }) => {
  return (
    <>
      {isHomePage && <Navbar />}
      <div className={'logo'}>
        <TF150Logo />
      </div>
      <Timeline events={events} />
      {isHomePage && <Info />}
    </>
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
