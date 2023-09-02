import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { NewsType } from '@models/news'
import { marked } from 'marked'
import { fetchNewsPost, fetchNews } from '@lib/api/news'
import { getLayoutProps } from '@utils/helpers'
import { NationLogo } from '@components/footer/Logos'
import { NavbarLink } from '@lib/api/navbar'
import Footer from '@components/footer'
import Header from '@components/header'

type Props = {
  post?: NewsType
  logos: NationLogo[]
  navbarLinks: NavbarLink[]
}

const renderer: marked.RendererObject = {
  image(href: string | null): string {
    return `<img class='event-page-image' src=${href} alt='bild' />`
  },
}

marked.use({ renderer })

/** Page for a single NewsPost */
const NewsPost: NextPage<Props> = ({ post, logos, navbarLinks }) => (
  <>
    <Header navbarLinks={navbarLinks} />
    <div className="mx-auto mb-6 mt-14 min-h-[92vh] max-w-[85vw] rounded-lg bg-white p-[15px] xl:mt-6 xl:max-w-screen-lg">
      <article className="prose prose-sm m-8">
        <h1>{post?.title}</h1>
        <div
          dangerouslySetInnerHTML={{
            __html: marked.parse(post?.content ?? ''),
          }}
        />
      </article>
    </div>
    <Footer logos={logos} />
  </>
)

export const getStaticPaths: GetStaticPaths = async () => {
  const news = await fetchNews(1)

  const paths =
    news?.data.map((post) => ({
      params: { slug: post.slug },
    })) ?? []

  return {
    paths,
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug instanceof Array ? params?.slug[0] : params?.slug
  const post = await fetchNewsPost(slug)
  const { homepage, logos, navbarLinks } = await getLayoutProps()
  return {
    props: {
      post,
      homepage,
      logos,
      navbarLinks,
    },
  }
}

export default NewsPost
