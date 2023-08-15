import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { PageType } from '@models/page'
import { marked } from 'marked'
import { fetchPrivatePage, fetchPrivatePages } from '@lib/api/privatepage'
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

type PrivatePageProps = {
  page: PageType
  logos: NationLogo[]
  navbarLinks: NavbarLink[]
}

const PrivatePage: NextPage<PrivatePageProps> = (props) => {
  return <Page {...props}/>
}

export const getStaticPaths: GetStaticPaths = async () => {
  // Get all content pages
  const privatePages = await fetchPrivatePages()

  // Create a path for each page
  const paths = privatePages.map((page) => ({
    params: {
      privatePage: page.slug,
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
  const page = await fetchPrivatePage(slug)
  const { logos, navbarLinks } = await getLayoutProps()
  return {
    props: {
      page,
      navbarLinks,
      logos,
    },
  }
}

export default PrivatePage
