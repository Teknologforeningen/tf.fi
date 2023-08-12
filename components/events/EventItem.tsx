import React from 'react'
import Link from 'next/link'
import { Event } from '@models/event'
import { getDateLong } from '@utils/helpers'

// TODO: get text ellipse to work properly, kinda spaghetti rn
const EventItem = ({ post }: { post: Event }) => {
  return (
    <div
      className="mt-4 w-full rounded-md border-[1px] border-white bg-white p-2 shadow-md"
      key={post.slug}
    >
      <p className="select-none text-xl font-medium">{post.title}</p>
      {post.type === 'event' && (
        <p className="select-none font-medium ">{getDateLong(post.date)}</p>
      )}
      <p className="max-h-[100px] overflow-hidden text-ellipsis text-sm">
        {post.description}
      </p>
      <Link
        href={`/events/${post.slug}`}
        className="text-sm font-extrabold leading-[18px] tracking-wide text-teknologröd hover:text-[15px] hover:font-semibold"
      >
        läs mera
      </Link>
    </div>
  )
}

export default EventItem
