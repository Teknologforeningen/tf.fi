import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { ContentPage } from '../../models/contentpage'
import { marked } from 'marked'
import { fetchContentPage, fetchContentPages } from '../../lib/api/contentpage'
import fetchNavbar, { NavbarLink } from '../../lib/api/navbar'
import Header from '../../components/header/Header'
import { useState } from 'react'
import { AvailableLanguages } from '../../utils/languages'

type Props = {
  contentPage: ContentPage
  navbarLinks: NavbarLink[]
}

const renderer: marked.RendererObject = {
  image(href: string | null): string {
    return `<img class='event-page-image' src=${href} alt='bild' />`
  },
}

marked.use({ renderer })

const ContentPage: NextPage<Props> = ({ contentPage, navbarLinks }) => {
  const [language, setLanguage] = useState<AvailableLanguages>('swedish')

  return (
    <div className="about grid grid-flow-row grid-cols-1 text-black md:grid-cols-4">
      <div className="col-span-full">
        <Header
          navbarLinks={navbarLinks}
          language={language}
          setLanguage={setLanguage}
        />
      </div>
      <div
        className="p-8 text-black md:col-span-2 md:col-start-2"
        dangerouslySetInnerHTML={{
          __html: marked.parse(contentPage.content),
        }}
      />
    </div>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  // Get all content pages
  const contentPages = await fetchContentPages()

  // Create a path for each page
  const paths = contentPages.map((contentpage) => ({
    params: {
      category: contentpage.category.data.attributes.slug,
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
  const contentPage = await fetchContentPage(slug)
  const navbarLinks = await fetchNavbar()

  return {
    props: {
      contentPage,
      navbarLinks,
    },
  }
}

export default ContentPage
