import { PageType } from '@models/page'
import { marked, RendererObject } from 'marked'
import TableOfContents from '@components/TableOfContents'
import PageSection from '@components/PageSection'

const renderer: RendererObject = {
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
  isPrivate?: boolean
}

const Page = async ({ page, isPrivate = false }: PageProps) => {
  return (
    <>
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
          fileFolders={section.attributes.file_folders.data}
          isPrivate={isPrivate}
        />
      ))}
    </>
  )
}

export default Page
