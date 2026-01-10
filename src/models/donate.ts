import { DonationLevels } from '@payload-types'
import { StrapiImage } from './image'

export interface DonatePage {
  title: string
  summary?: string
  quotes: Quote[]
  faqs: FAQ[]
  donor_list_title?: string
  donation_form_info?: string
  donation_levels?: DonationLevels
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
  phone?: string
  visibility: Visibility
  amount: string
}

export enum VisibilityType {
  visible = 'visible',
  pseudonym = 'pseudonym',
  anonymous = 'anonymous',
}

export type Visibility =
  | { type: VisibilityType.visible }
  | { type: VisibilityType.pseudonym; value: string }
  | { type: VisibilityType.anonymous }
