import { Category } from '@models/category'
import { fetchCollectionSingle } from '.'
import qs from 'qs'
import { DonatePage } from '@models/donate'

export async function fetchDonate(): Promise<DonatePage | undefined> {
  const query = qs.stringify({
    populate: {
      donation_page: {
        populate: {
          quotes: {
            populate: '*',
          },
          faqs: {
            populate: '*',
          },
        },
      },
    },
  })
  const res = await fetchCollectionSingle<Category>('/categories', 'donera', { query })
  return res?.data?.donation_page
}
