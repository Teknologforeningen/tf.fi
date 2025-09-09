import qs from 'qs'
import { PostType } from '@models/post'
import { fetchCollection, fetchCollectionSingle, PagePagination } from '@lib/strapi'

export const POSTS_PAGE_SIZE = 10

export async function fetchPost(slug?: string): Promise<PostType | null> {
  if (slug === undefined) return null
  const res = await fetchCollectionSingle<PostType>(`/posts`, slug)
  return res?.data ?? null
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
  const query = qs.stringify({
    sort: { createdAt: 'desc' },
  })

  const res = await fetchCollection<PostType>('/posts', {
    pagination,
    query,
  })

  return {
    data: res?.data ?? [],
    totalPages: res?.meta?.pagination.total ?? 0,
  }
}
