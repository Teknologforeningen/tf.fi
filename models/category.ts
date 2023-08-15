import { CollectionResponse } from '@lib/api/strapi'
import { PageType } from './page'

export type Category = {
  title: string
  slug: string
  content_pages: {
    data: CollectionResponse<PageType>
  }
  locale: string
}
