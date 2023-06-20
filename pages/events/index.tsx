import React from 'react'
import type { GetStaticProps } from 'next'
import { Event } from '../../models/event'
import Column from '../../components/Column'
import EventItem from '../../components/events/EventItem'
import  { NavbarLink } from '../../lib/api/navbar'
import { NationLogo } from '../../components/footer/Logos'
import Header from '../../components/header'
import Footer from '../../components/footer/footer'
import { getLayoutProps } from '../../utils/helpers'

type Props = {
  isHomePage: boolean
  logos: NationLogo[]
  navbarLinks: NavbarLink[]
  events: Event[]
}

//TODO: get text ellipse to work properly, kinda spaghetti rn
const Events = ({ events, logos, navbarLinks, isHomePage }: Props) => {
  return (
    <>
      <header>
        <Header navbarLinks={navbarLinks} isHomePage={isHomePage} />
      </header>
      <main className=" z-10 my-6 mx-auto min-h-[92vh] max-w-[95vw] p-[15px] md:max-w-[55vw] lg:max-w-[80vw]">
        <Column>
          <p className=" pb-5 text-3xl text-white">Nyheter</p>

          {events.map((post) => (
            <EventItem post={post} key={post.id} />
          ))}
        </Column>
      </main>
      <footer>
        <Footer logos={logos} />
      </footer>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const props = await getLayoutProps()
  return { props }
}

export default Events
