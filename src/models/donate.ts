import { DonationLevels } from '../../payload-types'
import { StrapiImage } from './image'
import type { Visibility } from '@components/donate/form/Visibility'

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
