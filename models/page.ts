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
  sections: {
    data: Section[]
  }
  category?: {
    data: SingleResponse<Category>
  }
}

export interface Section {
  id: number
  attributes: {
    title?: string
    content?: string
    createdAt: Date
    updatedAt: Date
    publishedAt: Date
    file_folders: {
      data: FileFolder[]
    }
    content_page?: {
      data: SingleResponse<PageType>
    }
    private_page?: {
      data: SingleResponse<PageType>
    }
  }
}

export interface FileFolder {
  id: number
  attributes: {
    title?: string
    folderId: string
    description?: string
    createdAt: Date
    updatedAt: Date
    publishedAt: Date
  }
}
