import qs from 'qs'
import { fetchFromStrapi } from '.'
import { Category } from '@models/category'

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
  if (!(categories instanceof Array))
    throw new Error('Categories need to be an array')
  else if (categories.length === 0)
    throw new Error('Categories cannot be empty')

  const category = categories[0]
  return category.attributes
}

export async function fetchCategories(): Promise<Category[]> {
  const res = await fetchFromStrapi<Category>('/categories')
  if (!(res instanceof Array)) throw new Error('Response needs to be an array')
  return res.map((e) => e.attributes)
}
