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
}

marked.use({ renderer })

type PageProps = {
  page: PageType
  logos: NationLogo[]
  navbarLinks: NavbarLink[]
}

const Page: NextPage<PageProps> = ({
  page,
  navbarLinks,
  logos,
}) => {
  return (
    <div className="bg-white">
      <Header navbarLinks={navbarLinks} />
      <div className="prose prose-sm m-8 mx-auto  min-h-[92vh] max-w-[85vw] rounded-lg bg-white p-[15px] xl:mt-6 xl:max-w-screen-lg">
        <h1>{page.title}</h1>
        {page.content && <p>{page.content}</p>}
        {page.showTableOfContents && (
          <TableOfContents sections={page.sections.data} />
        )}
        {page.sections.data.map((section, i) => (
          <PageSection
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

export default Page