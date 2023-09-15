import React from 'react'
import Link from 'next/link'
import { PostType } from '@models/post'
import { getDateLong } from '@utils/helpers'

const Post = ({ post }: { post: PostType }) => {
  return (
    <Link
      href={`/nyheter/${post.slug}`}
      className="mt-4 w-full rounded-md bg-lightGray p-2 shadow-md transition-shadow duration-200 ease-in-out hover:shadow-lg"
      key={post.slug}
    >
      <p className="select-none text-xl font-medium">{post.title}</p>
      {post.date && (
        <p className="select-none font-medium ">{getDateLong(post.date)}</p>
      )}
      <p className="max-h-[100px] overflow-hidden text-ellipsis text-sm">
        {post.description}
      </p>
      <p className="text-sm font-extrabold leading-[18px] tracking-wide text-teknologröd">
        läs mera
      </p>
    </Link>
  )
}

export default Post
