import React from 'react'
import { Event } from '../../models/event'
import Link from 'next/link'

type Props = {
  events: Event[]
}

//TODO: get text ellipse to work properly, kinda spaghetti rn
const Events = ({ events }: Props) => {
  return (
    <div className="flex h-[700px] w-full flex-col p-5 md:w-[50%]">
      <p className="m-2 pb-5 text-2xl text-white">Anslagstavlan</p>
      <div className="overflow-y h-[635px] overflow-scroll">
        {events.map(
          (post) =>
            post.type !== 'blogpost' && (
              <div
                className="m-2 rounded-md border-[1px] border-white bg-gray p-2"
                key={post.id}
              >
                <p className="select-none text-xl font-medium text-white">
                  {post.title}
                </p>
                <p className="select-none font-medium text-white">
                  {post.date.slice(0, 10)}
                </p>
                <p className="max-h-[100px] overflow-hidden text-ellipsis text-sm text-white">
                  {post.description}
                </p>
                <Link href={`/events/${post.slug}`}>
                  <a className="text-center text-sm font-extrabold leading-[18px] tracking-wide text-teknologröd hover:text-[15px] hover:font-semibold">
                    läs mer
                  </a>
                </Link>
              </div>
            )
        )}
      </div>
    </div>
  )
}

export default Events
