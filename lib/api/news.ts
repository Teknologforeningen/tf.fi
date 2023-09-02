import { NewsType } from '@models/news'
import strapi, { PagePagination } from '@lib/api/strapi'

export const NEWS_PAGE_SIZE = 10

export async function fetchNewsPost(slug?: string): Promise<NewsType | null> {
  if (slug === undefined) return null
  // TODO: Rename model in strapi
  const res = await strapi.fetchCollectionSingle<NewsType>(`/events`, slug)
  return res?.data?.attributes ?? null
}

type NewsResponse = {
  data: NewsType[]
  totalPages: number
}

export async function fetchNews(page?: number): Promise<NewsResponse | null> {
  const pagination: PagePagination = {
    page,
    pageSize: NEWS_PAGE_SIZE,
  }

  // TODO: Rename model in strapi
  const res = await strapi.fetchCollection<NewsType>('/events', {
    pagination,
  })

  return {
    data: res?.data?.map((e) => ({ id: e.id, ...e.attributes })) ?? [],
    totalPages: res?.meta?.pagination.total ?? 0,
  }
}
