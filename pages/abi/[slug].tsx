import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { marked } from 'marked'
import { AbiPage, fetchAbiPage, fetchAbiPages } from '../../lib/api/abi'
import Header from '../../components/header'
import fetchNavbar, { NavbarLink } from '../../lib/api/navbar'
import { useState } from 'react'
import { AvailableLanguages } from '../../utils/languages'

const renderer: marked.RendererObject = {
  link(href, title, text) {
    return `<a class="link" href=${href}>${text}</a>`
  },
  image(href) {
    // FIXME: Ugly hack
    if (
      href?.includes('jonathan') ||
      href?.includes('elsa') ||
      href?.includes('julius')
    ) {
      return `<img class='event-page-image' src=${href} alt='bild' width=150 style="float: right" />`
    } else {
      return `<img class='event-page-image' src=${href} alt='bild' />`
    }
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

const AbiPage: NextPage<{ abiPage: AbiPage; navbarLinks: NavbarLink[] }> = ({
  abiPage,
  navbarLinks,
}) => {
  const [language, setLanguage] = useState<AvailableLanguages>('swedish')

  return (
    <div className="about grid grid-flow-row grid-cols-1 md:grid-cols-4">
      <div className="col-span-full">
        <Header
          navbarLinks={navbarLinks}
          language={language}
          setLanguage={setLanguage}
        />
      </div>
      <div
        className="p-8 md:justify-self-end"
        dangerouslySetInnerHTML={{
          __html: marked.parse(abiPage.leftSidebar?.content ?? ''),
        }}
      />
      <div
        className="p-8 md:col-span-2 md:col-start-2 md:mx-auto md:w-2/3"
        dangerouslySetInnerHTML={{
          __html: marked.parse(abiPage.content),
        }}
      />
      <div
        className="p-8"
        dangerouslySetInnerHTML={{
          __html: marked.parse(abiPage.rightSidebar?.content ?? ''),
        }}
      />
    </div>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const abiPages = await fetchAbiPages()

  const paths = abiPages.map((aboutPage) => ({
    params: { slug: aboutPage.slug },
  }))

  return { paths, fallback: 'blocking' }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug instanceof Array ? params?.slug[0] : params?.slug
  const abiPage = await fetchAbiPage(slug)
  const navbarLinks = await fetchNavbar()
  return {
    props: {
      abiPage,
      navbarLinks,
    },
  }
}

export default AbiPage
