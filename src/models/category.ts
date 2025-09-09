import { CollectionResponse } from '@lib/strapi'
import { PageType } from './page'
import { DonatePage } from './donate'

export type Category = {
  title: string
  slug: string
  content_pages: CollectionResponse<PageType>
  donation_page?: DonatePage
  locale: string
}
