import React from 'react'
import { PostType } from '@models/post'
import Link from 'next/link'
import Post from './Post'
import Subtitle from '@components/Subtitle'

const Posts = ({ posts }: { posts: PostType[] }) => {
  return (
    <div className="mx-5 mr-4 flex flex-col md:w-[60%]">
      <Subtitle>Nyheter</Subtitle>
      {posts.map((post) => (
        <Post post={post} key={post.slug} />
      ))}
      <Link
        href={`/nyheter`}
        className="mt-4 rounded-md border-[1px] border-white p-2 text-center text-sm leading-[18px] tracking-wide text-white hover:text-[15px] hover:font-semibold"
      >
        Mera nyheter
      </Link>
    </div>
  )
}

export default Posts
