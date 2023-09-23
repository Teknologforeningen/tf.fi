import { CollectionResponse } from '@lib/strapi'
import { PageType } from './page'

export type Category = {
  title: string
  slug: string
  content_pages: {
    data: CollectionResponse<PageType>
  }
  locale: string
}
