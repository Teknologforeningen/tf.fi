import type {GetServerSideProps, NextPage} from 'next'
import TF150Logo from "../components/TF150Logo";
import Timeline from '../components/timeline';
import timeline from '../components/timeline'
import Column from '../components/column'
import { Event} from '../types'

interface Props {
    events: Event[]
}


const Home: NextPage<Props> = ({ events }) => {
  return (
      <>
        <div className={"logo"}>
            <TF150Logo />
            
        </div>
        <Timeline events={events}/>
      </>

  )
}

export const getServerSideProps: GetServerSideProps = async () => {
    // get posts from api
    const res = await fetch(`${process.env.BACKEND_URL}/events`)
    const events = await res.json()
    return {
        props: { events }
    }
}

export default Home
