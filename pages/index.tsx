import type { GetServerSideProps, NextPage } from 'next'
import TF150Logo from '../components/TF150Logo'
import Timeline from '../components/eventline/Timeline'
import { Event } from '../types'

interface Props {
  events: Event[]
}

const Home: NextPage<Props> = ({ events }) => {
  return (
    <>
      <div className={'logo'}>
        <TF150Logo />
      </div>
      <Timeline events={events} />
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
