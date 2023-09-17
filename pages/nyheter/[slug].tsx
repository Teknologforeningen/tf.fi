import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { PostType } from '@models/post'
import { marked, RendererObject } from 'marked'
import { fetchPost, fetchPosts } from '@lib/api/post'
import { getLayoutProps } from '@utils/helpers'
import { NationLogo } from '@components/footer/Logos'
import { NavbarLink } from '@lib/api/navbar'
import Footer from '@components/footer'
import Header from '@components/header'
import { getDateLong } from '@utils/helpers'

type Props = {
  post?: PostType
  logos: NationLogo[]
  navbarLinks: NavbarLink[]
}

const renderer: RendererObject = {
  image(href: string | null): string {
    return `<img class='event-page-image' src=${href} alt='bild' />`
  },
  link(href, _, text) {
    return `<a class="text-blue-600 underline visited:text-purple-600 hover:text-blue-800" href=${href}>${text}</a>`
  },
}

marked.use({ renderer })

/** Page for a single Post */
const Post: NextPage<Props> = ({ post, logos, navbarLinks }) => (
  <div className="flex min-h-screen flex-col">
    <Header navbarLinks={navbarLinks} />
    <div className="flex flex-grow justify-center">
      <div className="prose prose-sm mx-4 mb-12 mt-6 flex flex-col sm:mx-8 md:mx-16 md:mt-12">
        <h1>
          {post?.title}
          {post?.date && <p className="text-lg">{getDateLong(post?.date)}</p>}
        </h1>
        <div
          dangerouslySetInnerHTML={{
            __html: marked.parse(post?.content ?? ''),
          }}
        />
      </div>
    </div>
    <Footer logos={logos} />
  </div>
)

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await fetchPosts(1)

  const paths =
    posts?.data.map((post) => ({
      params: { slug: post.slug },
    })) ?? []

  return {
    paths,
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug instanceof Array ? params?.slug[0] : params?.slug
  const post = await fetchPost(slug)
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

export default Post
