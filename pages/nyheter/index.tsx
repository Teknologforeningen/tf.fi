import React, { useEffect, useState } from 'react'
import type { GetStaticProps } from 'next'
import { NewsType } from '@models/news'
import Column from '@components/Column'
import NewsPost from '@components/news/NewsPost'
import { NavbarLink } from '@lib/api/navbar'
import { NationLogo } from '@components/footer/Logos'
import Header from '@components/header'
import Footer from '@components/footer'
import { getLayoutProps } from '@utils/helpers'
import { NEWS_PAGE_SIZE, fetchNews } from '@lib/api/news'
import PageNavigation from '@components/PageNavigation'

type NewsProps = {
  logos: NationLogo[]
  navbarLinks: NavbarLink[]
}

const News = ({ logos, navbarLinks }: NewsProps) => {
  const [news, setNews] = useState<NewsType[]>([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    const fetch = async () => {
      const res = await fetchNews(page)
      if (res === null) return
      setNews(res.data)
      setTotalPages(res.totalPages)
    }
    fetch()
  }, [page])

  return (
    <>
      <Header navbarLinks={navbarLinks} />
      <main className="z-10 mx-auto my-6 min-h-[92vh] max-w-7xl p-[15px]">
        <Column>
          <p className="pb-5 text-3xl text-white">Nyheter</p>

          {news.map((post) => (
            <NewsPost post={post} key={post.slug} />
          ))}
          {totalPages / NEWS_PAGE_SIZE > 1 && (
            <PageNavigation
              currentPage={page}
              totalPages={Math.ceil(totalPages / NEWS_PAGE_SIZE)}
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

export default News
