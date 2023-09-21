import qs from 'qs'

export const API_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/api`

export type StrapiFetchOptions = {
  query?: string
  url?: string
  headers?: HeadersInit
  tags?: string[]
}

export type SingleResponse<T> = {
  id: number
  attributes: Omit<T, 'id'>
}

export type CollectionResponse<T> = SingleResponse<T>[]

type StrapiError = {
  status: number
  name: string
  message: string
  details: unknown
}

export type PagePagination = {
  page?: number
  pageSize?: number
  withCount?: boolean
}

export type OffsetPagination = {
  start?: number
  limit?: number
  withCount?: boolean
}

export type Pagination = PagePagination | OffsetPagination

export type Meta<T extends Pagination> = T extends PagePagination
  ? {
      pagination: {
        page: number
        pageSize: number
        pageCount: number
        total?: number
      }
    }
  : {
      pagination: {
        start: number
        limit: number
        total?: number
      }
    }

type StrapiResponse<
  T,
  S extends SingleResponse<T> | CollectionResponse<T> = CollectionResponse<T>,
  P extends Pagination = PagePagination
> = {
  data: S | null
  error?: StrapiError
  meta: Meta<P>
}

async function fetchSingle<T>(
  path: string,
  options?: Omit<StrapiFetchOptions, 'slug'>
): Promise<StrapiResponse<T, SingleResponse<T>> | null> {
  const url = options?.url ?? API_URL
  const query = options?.query ?? ''

  return fetchFromStrapi<T, SingleResponse<T>>({
    url: `${url}${path}?${query}`,
    headers: options?.headers,
    tags: options?.tags,
  })
}

async function fetchCollectionSingle<T>(
  path: string,
  slug: string,
  options?: StrapiFetchOptions
): Promise<StrapiResponse<T, SingleResponse<T>> | null> {
  const url = options?.url ?? API_URL
  const query = options?.query ?? ''
  const slugQuery = qs.stringify({
    filters: {
      slug: {
        $eq: slug,
      },
    },
  })

  const res = await fetchFromStrapi<T, CollectionResponse<T>>({
    url: `${url}${path}?${query}&${slugQuery}`,
    headers: options?.headers,
    tags: options?.tags,
  })

  if (!res?.data?.[0]) {
    return null
  }

  return {
    ...res,
    data: res.data[0],
  }
}

async function fetchCollection<T, P extends Pagination = PagePagination>(
  path: string,
  options?: Omit<StrapiFetchOptions, 'slug'> & { pagination?: P }
): Promise<StrapiResponse<T> | null> {
  const url = options?.url ?? API_URL
  const paginationQuery = options?.pagination
    ? qs.stringify({ pagination: options.pagination })
    : ''
  const query = options?.query ?? ''
  return fetchFromStrapi<T, CollectionResponse<T>>({
    url: `${url}${path}?${query}&${paginationQuery}`,
    headers: options?.headers,
    tags: options?.tags,
  })
}

interface StrapiFetchProps {
  url: string
  headers?: HeadersInit
  tags?: string[]
}

async function fetchFromStrapi<
  T,
  S extends CollectionResponse<T> | SingleResponse<T>
>({
  url,
  headers,
  tags,
}: StrapiFetchProps): Promise<StrapiResponse<T, S> | null> {
  const res = await fetch(url, { headers, next: { tags } })
  const json = (await res.json()) as StrapiResponse<T, S>
  if (json.error !== undefined) {
    console.error(`Error fetching ${url}: ${JSON.stringify(json.error)}`)
    return null
  }
  if (json.data === null) {
    console.warn(`${url} returned null`)
    return null
  }
  return json
}

const strapi = {
  fetchSingle,
  fetchCollection,
  fetchCollectionSingle,
}

export default strapi
