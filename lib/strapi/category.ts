import { Category } from '@models/category'
import { fetchCollection, fetchCollectionSingle } from '@lib/strapi/index'

export async function fetchCategory(slug?: string): Promise<Category | null> {
  if (slug === undefined) return null
  const res = await fetchCollectionSingle<Category>('/categories', slug)
  return res?.data?.attributes ?? null
}

export async function fetchCategories(): Promise<Category[]> {
  const res = await fetchCollection<Category>('/categories')
  return res?.data?.map((e) => e.attributes) ?? []
}
