import type { GetServerSideProps, NextPage } from 'next'
import TF150Logo from '../components/TF150Logo'
import Timeline from '../components/eventline/Timeline'
import { Event } from '../types'
import Navbar from '../components/navbar/Navbar'
import Info from '../components/bottom/Info'

interface Props {
  events: Event[]
}

const Home: NextPage<Props> = ({ events }) => {
  return (
    <>
      <Navbar />
      <div className={'logo'}>
        <TF150Logo />
      </div>
      <Timeline events={events} />
      <Info />
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  // Get posts from API
  const res = await fetch(`${process.env.BACKEND_URL}/events`)
  const events = await res.json()
  return {
    props: { events },
  }
}

export default Home
