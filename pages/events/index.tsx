import React from 'react'
import type { GetStaticProps } from 'next'
import Link from 'next/link'
import { Event } from '../../models/event'
import Column from '../../components/Column'
import EventItem from '../../components/events/EventItem'
import { fetchEvents } from '../../lib/api/event'

type Props = {
  events: Event[]
}

//TODO: get text ellipse to work properly, kinda spaghetti rn
const Events = ({ events }: Props) => {
  return (
    <div className=" z-10 my-6 mx-auto min-h-[92vh] max-w-[95vw] p-[15px] md:max-w-[55vw] lg:max-w-[80vw]">
      <Link href={'/'}>
        <a className="home-link home-link-text text-teknologröd">
          TILL HEMSIDAN
        </a>
      </Link>
      <Column>
        <p className=" pb-5 text-3xl text-white">Nyheter</p>

        {events.map((post) => (
          <EventItem post={post} key={post.id} />
        ))}
      </Column>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const events = await fetchEvents()

  return {
    props: {
      events,
    },
  }
}

export default Events
