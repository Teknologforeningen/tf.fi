import { NextPage } from 'next'
import { PageType } from '@models/page'
import { marked } from 'marked'
import { NavbarLink } from '@lib/api/navbar'
import Header from '@components/header'
import { NationLogo } from '@components/footer/Logos'
import Footer from '@components/footer'
import TableOfContents from '@components/TableOfContents'
import PageSection from '@components/PageSection'

const renderer: marked.RendererObject = {
  image(href: string | null): string {
    return `<img class='event-page-image' src=${href} alt='bild' />`
  },
  link(href, _, text) {
    return `<a class="text-blue-600 underline visited:text-purple-600 hover:text-blue-800" href=${href}>${text}</a>`
  },
}

marked.use({ renderer })

type PageProps = {
  page: PageType | null
  logos: NationLogo[]
  navbarLinks: NavbarLink[]
  isPrivate: boolean
}

const Page: NextPage<PageProps> = ({ page, navbarLinks, logos, isPrivate }) => {
  return (
    <div className="bg-white">
      <Header navbarLinks={navbarLinks} />
      <div className="flex justify-center">
        <div className="prose prose-sm my-12 ml-16 mr-8 flex flex-col">
          <h1>{page?.title}</h1>
          {page?.content && (
            <div
              dangerouslySetInnerHTML={{
                __html: marked.parse(page.content ?? ''),
              }}
            />
          )}
          {page?.showTableOfContents && (
            <TableOfContents sections={page.sections.data} />
          )}
          {page?.sections?.data.map((section, i) => (
            <PageSection
              key={i}
              title={section.attributes.title}
              content={section.attributes.content}
              file_folders={section.attributes.file_folders.data}
              isPrivate={isPrivate}
            />
          ))}
        </div>
      </div>
      <Footer logos={logos} />
    </div>
  )
}

export default Page
