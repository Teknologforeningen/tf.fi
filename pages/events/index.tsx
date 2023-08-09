import React, { useEffect, useState } from 'react'
import type { GetStaticProps } from 'next'
import { Event } from '@models/event'
import Column from '@components/Column'
import EventItem from '@components/events/EventItem'
import { NavbarLink } from '@lib/api/navbar'
import { NationLogo } from '@components/footer/Logos'
import Header from '@components/header'
import Footer from '@components/footer'
import { getLayoutProps } from '@utils/helpers'
import { fetchEvents } from '@lib/api/event'
import PageNavigation from '@components/PageNavigation'
import { EVENT_PAGE_SIZE } from '@utils/constants'

type EventsProps = {
  logos: NationLogo[]
  navbarLinks: NavbarLink[]
}

const Events = ({ logos, navbarLinks }: EventsProps) => {
  const [events, setEvents] = useState<Event[]>([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    const fetch = async () => {
      const res = await fetchEvents(page)
      setEvents(res.data)
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

          {events.map((post) => (
            <EventItem post={post} key={post.id} />
          ))}
          {totalPages / EVENT_PAGE_SIZE > 1 && (
            <PageNavigation
              currentPage={page}
              totalPages={Math.ceil(totalPages / EVENT_PAGE_SIZE)}
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

export default Events
