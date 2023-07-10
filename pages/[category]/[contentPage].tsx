import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { ContentPage } from '../../models/contentpage'
import { marked } from 'marked'
import { fetchContentPage, fetchContentPages } from '../../lib/api/contentpage'
import { NavbarLink } from '../../lib/api/navbar'
import Header from '../../components/header'
import { useState } from 'react'
import { AvailableLanguages } from '../../utils/languages'
import { NationLogo } from '../../components/footer/Logos'
import Footer from '../../components/footer/Footer'
import { getLayoutProps } from '../../utils/helpers'

type Props = {
  contentPage: ContentPage
  logos: NationLogo[]
  navbarLinks: NavbarLink[]
}

const renderer: marked.RendererObject = {
  image(href: string | null): string {
    return `<img class='event-page-image' src=${href} alt='bild' />`
  },
}

marked.use({ renderer })

const ContentPage: NextPage<Props> = ({
  contentPage,
  navbarLinks,
  logos 
}) => {
  const [language, setLanguage] = useState<AvailableLanguages>('swedish')
  return (
    <>
      <Header
        navbarLinks={navbarLinks}
        language={language}
        setLanguage={setLanguage}
      />
      <div className="mx-auto mb-6 mt-14 xl:mt-6 min-h-[92vh] rounded-lg bg-white p-[15px] max-w-[85vw] xl:max-w-screen-lg">
        <article className="prose prose-sm m-8">
          <h1>{contentPage.title}</h1>
          <div
            dangerouslySetInnerHTML={{
              __html: marked.parse(contentPage?.content ?? ''),
            }}
          />
        </article>
    </div>
    <Footer logos={logos} />
    </>
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
  const { logos, navbarLinks } = await getLayoutProps()

  return {
    props: {
      contentPage,
      navbarLinks,
      logos,
    },
  }
}

export default ContentPage
