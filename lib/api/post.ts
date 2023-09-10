import { PostType } from '@models/post'
import strapi, { PagePagination } from '@lib/api/strapi'

export const POSTS_PAGE_SIZE = 10

export async function fetchPost(slug?: string): Promise<PostType | null> {
  if (slug === undefined) return null
  const res = await strapi.fetchCollectionSingle<PostType>(`/posts`, slug)
  return res?.data?.attributes ?? null
}

type PostsResponse = {
  data: PostType[]
  totalPages: number
}

export async function fetchPosts(page?: number): Promise<PostsResponse | null> {
  const pagination: PagePagination = {
    page,
    pageSize: POSTS_PAGE_SIZE,
  }

  const res = await strapi.fetchCollection<PostType>('/posts', {
    pagination,
  })

  return {
    data: res?.data?.map((e) => ({ id: e.id, ...e.attributes })) ?? [],
    totalPages: res?.meta?.pagination.total ?? 0,
  }
}
