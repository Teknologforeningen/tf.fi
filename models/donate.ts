import { StrapiImage } from './image'
import type { Visibility } from '@components/donate/form/Visibility'

export interface DonatePage {
  title: string
  summary?: string
  quotes: Quote[]
  faqs: FAQ[]
}

export interface Quote {
  author: string
  content: string
  picture: StrapiImage
}

export interface FAQ {
  question: string
  answer: string
}

export interface Donation {
  name: string
  email: string
  visibility: Visibility
  amount: string
}