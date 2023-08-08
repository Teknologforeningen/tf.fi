import type { GetStaticProps, NextPage } from 'next'
import Image from 'next/image'
import { useState } from 'react'
import { AvailableLanguages } from '../utils/languages'
import { fetchEvents } from '../lib/api/event'
import { fetchHomepage } from '../lib/api/homepage'
import Column from '../components/Column'
import { NationLogo } from '../components/footer/Logos'
import fetchNavbar, { NavbarLink } from '../lib/api/navbar'
import Header from '../components/header'
import Item from '../components/Item'
import Calendar from '../components/calendar/Calendar'
import { Event } from '../models/event'
import MainBanner, { BannerImage } from '../components/Banner'
import TFInfo from '../components/TFInfo'
import Events from '../components/events/Events'
import Row from '../components/Row'
import Footer from '../components/footer/Footer'

export interface HomePage {
  banner?: {
    bannerImages?: {
      data: BannerImage[]
    }
  }
  footer: {
    nationlogos: NationLogo[]
  }
}

type Props = {
  logos: NationLogo[]
  navbarLinks: NavbarLink[]
  events: Event[]
  bannerImages: BannerImage[]
}

const Home: NextPage<Props> = ({
  navbarLinks,
  logos,
  events,
  bannerImages,
}) => {
  const [language, setLanguage] = useState<AvailableLanguages>('swedish')

  return (
    <>
      <Header
        navbarLinks={navbarLinks}
        language={language}
        setLanguage={setLanguage}
      />
      <main>
        <Column>
          <MainBanner bannerImages={bannerImages} />
          <Item
            backgroundColor="darkgray"
            className="max-w-[1500px] flex-col md:flex-row"
          >
            <Events events={events.slice(0, 5)} />
            <Calendar />
          </Item>
          <Row className="relative w-full overflow-hidden">
            <div className="h-[500px] w-0 md:w-1/2">
              <Image
                src={`/images/banner/0.jpg`}
                alt="jeej"
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>
            <div className="relative h-[500px] w-0 md:w-1/2">
              <Image
                src={`/images/banner/1.jpg`}
                alt="jeej"
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>
          </Row>
          <Item backgroundColor="white">
            <TFInfo />
          </Item>
        </Column>
      </main>
      <Footer logos={logos} />
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const events = await fetchEvents(1)
  const homepage = await fetchHomepage()
  const navbarLinks = await fetchNavbar()
  const logos = homepage.footer.nationlogos
  return {
    props: {
      navbarLinks,
      events: events.data,
      logos,
      bannerImages: homepage.banner?.bannerImages?.data ?? [],
    },
  }
}

export default Home
