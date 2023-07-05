import qs from 'qs'
import { fetchFromStrapi } from '.'
import { Category } from '../../models/category'

export async function fetchCategory(slug?: string): Promise<Category> {
  const query = slug
    ? qs.stringify({
        filters: {
          slug: {
            $eq: slug,
          },
        },
      })
    : ''
  const categories = await fetchFromStrapi<Category>(`/categories?${query}`)
  if (!(categories instanceof Array)) return Promise.reject()
  else if (categories.length === 0) return Promise.reject()

  const category = categories[0]
  return category.attributes
}

export async function fetchCategories(): Promise<Category[]> {
  const res = await fetchFromStrapi<Category>('/categories')
  if (!(res instanceof Array)) return Promise.reject()
  return res.map((e) => e.attributes)
}
