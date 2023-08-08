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
import TableOfContents from '../../components/content/TableOfContents'
import ContentSection from '../../components/pages/ContentSection'

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

const ContentPage: NextPage<Props> = ({ contentPage, navbarLinks, logos }) => {
  const [language, setLanguage] = useState<AvailableLanguages>('swedish')
  return (
    <div className="bg-white">
      <Header
        navbarLinks={navbarLinks}
        language={language}
        setLanguage={setLanguage}
      />
      <div className="prose prose-sm m-8 mx-auto  min-h-[92vh] max-w-[85vw] rounded-lg bg-white p-[15px] xl:mt-6 xl:max-w-screen-lg">
        <h1>{contentPage.title}</h1>
        {contentPage.content && <p>{contentPage.content}</p>}
        {contentPage.showTableOfContents && (
          <TableOfContents sections={contentPage.content_sections.data} />
        )}
        {contentPage.content_sections.data.map((section, i) => (
          <ContentSection
            key={i}
            title={section.attributes.title}
            content={section.attributes.content}
            file_folders={section.attributes.file_folders.data}
          />
        ))}
      </div>
      <Footer logos={logos} />
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
