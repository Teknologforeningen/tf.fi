import React from 'react'
import { Event } from '../../models/event'
import Link from 'next/link'

type Props = {
  post: Event
}

//TODO: get text ellipse to work properly, kinda spaghetti rn
const EventItem = ({ post }: Props) => {
  return (
    <div
      className="m-2 w-full rounded-md border-[1px] border-white bg-white p-2 shadow-md"
      key={post.id}
    >
      <p className="select-none text-xl font-medium">{post.title}</p>
      {post.type === 'event' && (
        <p className="select-none font-medium ">{post.date.slice(0, 10)}</p>
      )}
      <p className="max-h-[100px] overflow-hidden text-ellipsis text-sm">
        {post.description}
      </p>
      <Link href={`/events/${post.slug}`}>
        <a className="text-center text-sm font-extrabold leading-[18px] tracking-wide text-teknologröd hover:text-[15px] hover:font-semibold">
          läs mer
        </a>
      </Link>
    </div>
  )
}

export default EventItem
