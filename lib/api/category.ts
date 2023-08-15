import { Category } from '@models/category'
import strapi from '@lib/api/strapi'

export async function fetchCategory(slug?: string): Promise<Category | null> {
  if (slug === undefined) return null
  const res = await strapi.fetchCollectionSingle<Category>('/categories', slug)
  return res?.data?.attributes ?? null
}

export async function fetchCategories(): Promise<Category[]> {
  const res = await strapi.fetchCollection<Category>('/categories')
  return res?.data?.map((e) => e.attributes) ?? []
}
