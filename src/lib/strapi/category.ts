import { Category } from '@models/category'
import { fetchCollection, fetchCollectionSingle } from '@lib/strapi/index'
import qs from 'qs'

export async function fetchCategory(slug?: string): Promise<Category | null> {
  if (slug === undefined) return null
  const query = qs.stringify({
    populate: {
      donation_page: {
        populate: ['faqs', 'quotes', 'quotes.picture'],
      },
    },
  })

  const res = await fetchCollectionSingle<Category>('/categories', slug, { query })
  return res?.data ?? null
}

export async function fetchCategories(): Promise<Category[]> {
  const res = await fetchCollection<Category>('/categories')
  return res?.data ?? []
}
