import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { PageType } from '@models/page'
import { marked } from 'marked'
import { fetchContentPage, fetchContentPages } from '@lib/api/contentpage'
import { NavbarLink } from '@lib/api/navbar'
import { NationLogo } from '@components/footer/Logos'
import { getLayoutProps } from '@utils/helpers'
import Page from '@components/Page'

const renderer: marked.RendererObject = {
  image(href: string | null): string {
    return `<img class='event-page-image' src=${href} alt='bild' />`
  },
}

marked.use({ renderer })

type ContentPageProps = {
  page: PageType
  logos: NationLogo[]
  navbarLinks: NavbarLink[]
}

const ContentPage: NextPage<ContentPageProps> = (props) => {
  return <Page {...props} />
}

export const getStaticPaths: GetStaticPaths = async () => {
  // Get all content pages
  const contentPages = await fetchContentPages()

  // Create a path for each page
  const paths = contentPages
    .filter((category) => category)
    .map((contentpage) => ({
      params: {
        category: contentpage.category?.data.attributes.slug,
        contentPage: contentpage.slug,
      },
    }))

  return {
    paths,
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug =
    params?.contentPage instanceof Array
      ? params?.contentPage[0]
      : params?.contentPage
  const page = await fetchContentPage(slug)
  const { logos, navbarLinks } = await getLayoutProps()
  return {
    props: {
      page,
      navbarLinks,
      logos,
    },
  }
}

export default ContentPage
