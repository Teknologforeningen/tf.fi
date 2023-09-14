import React from 'react'
import Link from 'next/link'
import { PostType } from '@models/post'
import { getDateLong } from '@utils/helpers'

const Post = ({ post }: { post: PostType }) => {
  return (
    <div
      className="mt-4 w-full rounded-md bg-lightGray p-2"
      key={post.slug}
    >
      <p className="select-none text-xl font-medium">{post.title}</p>
      {post.date && (
        <p className="select-none font-medium ">{getDateLong(post.date)}</p>
      )}
      <p className="max-h-[100px] overflow-hidden text-ellipsis text-sm">
        {post.description}
      </p>
      <Link
        href={`/nyheter/${post.slug}`}
        className="text-sm font-extrabold leading-[18px] tracking-wide text-teknologröd hover:text-[15px] hover:font-semibold"
      >
        läs mera
      </Link>
    </div>
  )
}

export default Post
