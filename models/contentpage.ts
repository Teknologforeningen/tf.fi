import { CollectionResponse } from '../lib/api'
import { Category } from './category'

export type ContentPage = {
  title: string
  slug: string
  content: string
  description?: string
  published_at: string
  created_at: string
  updated_at: string
  category: {
    data: CollectionResponse<Category>
  }
}
