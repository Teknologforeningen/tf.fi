import { SingleResponse } from '@lib/api/strapi'
import { Category } from './category'

export type ContentPage = {
  title: string
  slug: string
  content?: string
  createdAt: Date
  updatedAt: Date
  publishedAt: Date
  locale: string
  showTableOfContents: boolean
  content_sections: {
    data: ContentSection[]
  }
  category: {
    data: SingleResponse<Category>
  }
}

export interface ContentSection {
  id: number
  attributes: {
    title: string
    content: string
    createdAt: Date
    updatedAt: Date
    publishedAt: Date
    file_folders: {
      data: FileFolder[]
    }
  }
}

export interface FileFolder {
  id: number
  attributes: {
    title: string
    folderId: string
    description?: string
    createdAt: Date
    updatedAt: Date
    publishedAt: Date
    file_folders: ContentSection
  }
}
