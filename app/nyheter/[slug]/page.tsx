import { marked, RendererObject } from 'marked'
import { fetchPost, fetchPosts } from '@lib/strapi/post'
import { getDateLong } from '@utils/helpers'

const renderer: RendererObject = {
  image(href: string | null): string {
    return `<img class='event-page-image' src=${href} alt='bild' />`
  },
  link(href, _, text) {
    return `<a class="text-blue-600 underline visited:text-purple-600 hover:text-blue-800" href=${href}>${text}</a>`
  },
}

marked.use({ renderer })

export async function generateStaticParams() {
  const posts = await fetchPosts(1)
  return posts?.data.map((post) => ({ slug: post.slug })) ?? []
}

/** Page for a single Post */
const Page = async (props: { params: Promise<{ slug: string }> }) => {
  const params = await props.params
  const post = await fetchPost(params.slug)

  return (
    <>
      <h1>
        {post?.title}
        {post?.date && <p className="text-lg">{getDateLong(post?.date)}</p>}
      </h1>
      <div
        dangerouslySetInnerHTML={{
          __html: marked.parse(post?.content ?? ''),
        }}
      />
    </>
  )
}

export default Page
