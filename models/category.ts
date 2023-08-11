import { CollectionResponse } from '@lib/api'
import { ContentPage } from './contentpage'

export type Category = {
  title: string
  slug: string
  content_pages: {
    data: CollectionResponse<ContentPage>[]
  }
  locale: string
}
