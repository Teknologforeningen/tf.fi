import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { marked } from 'marked'
import { AboutPage, fetchAboutPage, fetchAboutPages } from '../../lib/api/about'
import Header from '../../components/header'
import { NavbarLink } from '../../lib/api/navbar'
import { useState } from 'react'
import { AvailableLanguages } from '../../utils/languages'
import { getLayoutProps } from '../../utils/helpers'
import Footer from '../../components/footer/Footer'
import { NationLogo } from '../../components/footer/Logos'

const renderer: marked.RendererObject = {
  link(href, title, text) {
    return `<a class="link" href=${href}>${text}</a>`
  },
  image(href) {
    return `<img class='event-page-image' src=${href} alt='bild' />`
  },
  tablecell(content, flags) {
    if (flags.header && content === '' && flags.align === null) {
      return '<th />'
    } else if (flags.header && content === '<strong>Pris (€)</strong>') {
      return `<th colspan=2>${content}</th>`
    } else {
      return `<td align=${flags.align}>${content}</p>`
    }
  },
}

marked.use({ renderer })

const AboutSideBar: React.FC<{ about: AboutPage }> = ({ about }) => {
  if (about.sidebar === null) return null

  const html =
    about.slug === 'dagsrestaurangen' ? about.sidebar : marked(about.sidebar)

  return (
    <div
      className="w-full p-4 pt-8 text-black"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}

const AboutPage: NextPage<{
  about: AboutPage
  navbarLinks: NavbarLink[]
  logos: NationLogo[]
}> = ({ about, navbarLinks, logos }) => {
  const [language, setLanguage] = useState<AvailableLanguages>('swedish')
  return (
    <>
      <div className="about grid min-h-[90%] grid-flow-row grid-cols-1 text-black md:grid-cols-4">
        <div className="col-span-full">
          <Header
            navbarLinks={navbarLinks}
            isHomePage
            language={language}
            setLanguage={setLanguage}
          />
        </div>
        <div
          className="m-8 rounded-lg bg-white p-8 text-black md:col-span-2 md:col-start-2"
          dangerouslySetInnerHTML={{
            __html: marked.parse(about.content),
          }}
        />
        <AboutSideBar about={about} />
      </div>
      <Footer logos={logos} />
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const aboutPages = await fetchAboutPages()

  const paths = aboutPages.map((aboutPage) => ({
    params: { slug: aboutPage.slug },
  }))

  return { paths, fallback: 'blocking' }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug instanceof Array ? params?.slug[0] : params?.slug
  const about = await fetchAboutPage(slug)
  const layoutProps = await getLayoutProps()
  return {
    props: {
      about,
      ...layoutProps,
    },
  }
}

export default AboutPage
