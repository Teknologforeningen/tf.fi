import { SingleResponse } from '@lib/strapi'
import { Category } from './category'

export type PageType = {
  title: string
  slug: string
  content?: string
  createdAt: Date
  updatedAt: Date
  publishedAt: Date
  locale: string
  showTableOfContents: boolean
  sections: Section[]
  category?: SingleResponse<Category>
}

export interface Section {
  documentId: string
  title?: string
  content?: string
  createdAt: Date
  updatedAt: Date
  publishedAt: Date
  file_folders: FileFolder[]
  content_page?: SingleResponse<PageType>
  private_page?: SingleResponse<PageType>
}

export interface FileFolder {
  documentId: string
  title?: string
  folderId: string
  description?: string
  createdAt: Date
  updatedAt: Date
  publishedAt: Date
}
