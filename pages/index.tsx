import type {GetServerSideProps, NextPage} from 'next'
import { Chrono } from 'react-chrono'
import {Event} from "../types";
import Link from "next/link";

interface Props {
    events: Event[]
}

const Home: NextPage<Props> = ({ events }) => {
    const items = events.map(event => ({
        title: (new Date(event.date)).toLocaleString()
    }))
  return (
    <div>
        <Chrono
            items={items}
            mode='VERTICAL_ALTERNATING'
            hideControls
            theme={{
                primary: 'red',
                secondary: 'dark-red',
                titleColor: 'red'
            }}
            cardWidth={500}
            enableOutline={true}
        >
            {events.map(event => (
                <div key={event.id}>
                    <div>
                        <h2>{event.title}</h2>
                    </div>
                    <p>{event.description}</p>
                    <Link href={event.slug}><a>Read More</a></Link>
                </div>
            ))}
        </Chrono>
    </div>
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
