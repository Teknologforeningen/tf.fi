'use client'

import { PostType } from '@models/post'
import React, { useEffect, useState } from 'react'
import { fetchPosts, POSTS_PAGE_SIZE } from '@lib/strapi/post'
import Post from '@components/posts/Post'
import PageNavigation from '@components/PageNavigation'

const Posts = ({ initialPosts, totalPages }: { initialPosts: PostType[]; totalPages: number }) => {
  const [posts, setPosts] = useState(initialPosts)
  const [page, setPage] = useState(1)

  useEffect(() => {
    if (page !== 1) {
      fetchPosts(page).then((newPosts) => {
        if (newPosts !== null) {
          setPosts(newPosts.data)
        }
      })
    }
  }, [page])

  return (
    <>
      {posts.map((post) => (
        <Post post={post} key={post.slug} />
      ))}
      {totalPages / POSTS_PAGE_SIZE > 1 && (
        <PageNavigation currentPage={page} totalPages={Math.ceil(totalPages / POSTS_PAGE_SIZE)} setPage={setPage} />
      )}
    </>
  )
}

export default Posts
