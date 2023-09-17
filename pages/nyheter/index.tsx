import React, { useEffect, useState } from 'react'
import type { GetStaticProps } from 'next'
import { PostType } from '@models/post'
import Column from '@components/Column'
import Post from '@components/posts/Post'
import { NavbarLink } from '@lib/api/navbar'
import { NationLogo } from '@components/footer/Logos'
import Header from '@components/header'
import Footer from '@components/footer'
import { getLayoutProps } from '@utils/helpers'
import { POSTS_PAGE_SIZE, fetchPosts } from '@lib/api/post'
import PageNavigation from '@components/PageNavigation'

type PostsProps = {
  logos: NationLogo[]
  navbarLinks: NavbarLink[]
}

const Posts = ({ logos, navbarLinks }: PostsProps) => {
  const [posts, setPosts] = useState<PostType[]>([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    const fetch = async () => {
      const res = await fetchPosts(page)
      if (res === null) return
      setPosts(res.data)
      setTotalPages(res.totalPages)
    }
    fetch()
  }, [page])

  return (
    <>
      <Header navbarLinks={navbarLinks} />
      <main className="z-10 mx-auto my-6 min-h-[92vh] max-w-7xl p-[15px]">
        <Column>
          <p className="pb-5 text-3xl">Nyheter</p>

          {posts.map((post) => (
            <Post post={post} key={post.slug} />
          ))}
          {totalPages / POSTS_PAGE_SIZE > 1 && (
            <PageNavigation
              currentPage={page}
              totalPages={Math.ceil(totalPages / POSTS_PAGE_SIZE)}
              setPage={setPage}
            />
          )}
        </Column>
      </main>
      <Footer logos={logos} />
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const props = await getLayoutProps()
  return { props }
}

export default Posts
