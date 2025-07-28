import React from 'react'
import Column from '@components/Column'
import { fetchPosts } from '@lib/strapi/post'
import Posts from '@components/posts/Posts'

const Page = async () => {
  const postsResponse = await fetchPosts(1)
  if (postsResponse == null) {
    return null
  }
  const { data: posts, totalPages } = postsResponse

  return (
    <Column className="z-10 mx-auto my-6 min-h-[92vh] max-w-7xl p-4">
      <h1 className="py-16 text-4xl font-bold">Nyheter</h1>
      <Posts initialPosts={posts} totalPages={totalPages} />
    </Column>
  )
}

export default Page
