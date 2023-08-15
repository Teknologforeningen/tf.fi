import { SingleResponse } from '@lib/api/strapi'
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
  }
}
