import { fetchPosts } from '@lib/strapi/post'
import Column from '@components/Column'
import Item from '@components/Item'
import Calendar from '@components/calendar/Calendar'
import { PostType } from '@models/post'
import MainBanner from '@components/banner/Banner'
import TFInfo from '@components/TFInfo'
import Posts from '@components/posts'
import { StrapiImage } from '@models/image'

export type Homepage = {
  banner?: {
    bannerImages?: StrapiImage[]
  }
}

async function getPosts(): Promise<PostType[]> {
  const posts = await fetchPosts(1)
  return posts?.data ?? []
}

const Page = async () => {
  const posts = await getPosts()

  return (
    <Column>
      <MainBanner />
      <Item backgroundColor="white" className="max-w-[1500px] flex-col md:flex-row">
        <Posts posts={posts.slice(0, 5)} />
        <Calendar />
      </Item>
      <Item backgroundColor="white">
        <TFInfo />
      </Item>
    </Column>
  )
}

export default Page
