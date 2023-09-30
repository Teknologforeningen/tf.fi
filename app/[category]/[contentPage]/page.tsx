export const dynamic = 'force-static'
import { fetchContentPage, fetchContentPages } from '@lib/strapi/contentpage'
import Page from '@components/Page'

export const generateStaticParams = async () => {
  // Get all content pages
  const contentPages = await fetchContentPages()

  // Create a path for each page
  return contentPages
    .filter((category) => category)
    .map((contentPage) => ({
      params: {
        category: contentPage.category?.data?.attributes?.slug,
        contentPage: contentPage.slug,
      },
    }))
}

const ContentPage = async ({ params }: { params: { contentPage: string } }) => {
  const page = await fetchContentPage(params.contentPage)
  return <Page page={page} />
}

export default ContentPage
