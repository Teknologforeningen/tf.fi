import React from 'react'
import Link from 'next/link'
import { PostType } from '@models/post'
import { getDateLong } from '@utils/helpers'
import Column from '@components/Column'

const Post = ({ post }: { post: PostType }) => {
  return (
    <Link
      href={`/nyheter/${post.slug}`}
      className="mt-4 w-full rounded-md bg-lightGray p-2 shadow-md transition-shadow duration-200 ease-in-out hover:shadow-lg"
      key={post.slug}
    >
      <Column className="items-baseline gap-1">
        <h3 className="select-none text-xl xxs:text-2xl font-medium">{post.title}</h3>
        {post.date && <p className="select-none xxs:text-xl">{getDateLong(post.date)}</p>}
        <p className="max-h-[100px] overflow-hidden text-ellipsis text-sm">{post.description}</p>
        <p className="font-semibold leading-[18px] tracking-wide text-teknologröd">läs mera</p>
      </Column>
    </Link>
  )
}

export default Post
