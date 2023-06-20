import React from 'react'
import { Event } from '../../models/event'
import Link from 'next/link'
import Column from '../Column'
import EventItem from './EventItem'

type Props = {
  events: Event[]
  title: string
}

//TODO: get text ellipse to work properly, kinda spaghetti rn
const Events = ({ events, title }: Props) => {
  return (
    <Column className="mr-4 w-full md:w-[60%]">
      <p className="pb-5 text-3xl text-white">{title}</p>

      {events.map((post) => (
        <EventItem post={post} key={post.id} />
      ))}
      <Link href={`/events`}>
        <a className=" mt-3 rounded-md border-[1px] border-white p-2 text-center text-sm leading-[18px] tracking-wide text-white hover:text-[15px] hover:font-semibold">
          Mera nyheter
        </a>
      </Link>
    </Column>
  )
}

export default Events
