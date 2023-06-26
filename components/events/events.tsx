import React from 'react'
import { Event } from '../../models/event'
import Link from 'next/link'
import EventItem from './EventItem'
import Subtitle from '../Subtitle'
type Props = {
  events: Event[]
}

const Events = ({ events }: Props) => {
  return (
    <div className="mx-5 mr-4 flex flex-col md:w-[60%]">
      <Subtitle>Nyheter</Subtitle>
      {events.map((post) => (
        <EventItem post={post} key={post.id} />
      ))}
      <Link
        href={`/events`}
        className="mt-4 rounded-md border-[1px] border-white p-2 text-center text-sm leading-[18px] tracking-wide text-white hover:text-[15px] hover:font-semibold"
      >
        Mera nyheter
      </Link>
    </div>
  )
}

export default Events
