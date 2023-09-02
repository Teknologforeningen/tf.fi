import type { GetStaticProps, NextPage } from 'next'
import Image from 'next/image'
import { fetchNews } from '@lib/api/news'
import { fetchHomepage } from '@lib/api/homepage'
import Column from '@components/Column'
import { NationLogo } from '@components/footer/Logos'
import fetchNavbar, { NavbarLink } from '../lib/api/navbar'
import Header from '@components/header'
import Item from '@components/Item'
import Calendar from '@components/Calendar'
import { NewsType } from '@models/news'
import MainBanner, { BannerImage } from '@components/Banner'
import TFInfo from '@components/TFInfo'
import News from '@components/news'
import Row from '@components/Row'
import Footer from '@components/footer'

export interface HomePage {
  banner?: {
    bannerImages?: {
      data: BannerImage[]
    }
  }
  footer?: {
    nationlogos?: NationLogo[]
  }
}

type HomeProps = {
  logos: NationLogo[]
  navbarLinks: NavbarLink[]
  news: NewsType[]
  bannerImages: BannerImage[]
}

const Home: NextPage<HomeProps> = ({
  navbarLinks,
  logos,
  news,
  bannerImages,
}) => (
  <>
    <Header navbarLinks={navbarLinks} />
    <main>
      <Column>
        <MainBanner bannerImages={bannerImages} />
        <Item
          backgroundColor="darkgray"
          className="max-w-[1500px] flex-col md:flex-row"
        >
          <News news={news.slice(0, 5)} />
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

export const getStaticProps: GetStaticProps = async () => {
  const news = await fetchNews(1)
  const homepage = await fetchHomepage()
  const navbarLinks = await fetchNavbar()

  return {
    props: {
      navbarLinks,
      news: news?.data ?? [],
      logos: homepage?.footer?.nationlogos ?? [],
      bannerImages: homepage?.banner?.bannerImages?.data ?? [],
    },
  }
}

export default Home
