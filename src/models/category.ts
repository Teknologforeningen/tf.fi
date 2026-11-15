import { CollectionResponse } from '@lib/strapi'
import { PageType } from './page'
import { DonateData } from './donate'

export type Category = {
  title: string
  slug: string
  content_pages: CollectionResponse<PageType>
  donation_page?: DonateData
  locale: string
}
