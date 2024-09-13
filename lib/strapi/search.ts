import qs from 'qs'
import { fetchCollection, SingleResponse } from '.'
import { PageType, Section } from '@models/page'

export type SearchData = {
  sectionData: Section[]
  pageData: SingleResponse<PageType>[]
  privateSectionData: Section[]
  privatePageData: SingleResponse<PageType>[]
}

export async function searchPublic(
  searchParam: string,
  sessionToken?: string
): Promise<SearchData> {
  const categoryQuery = qs.stringify({
    populate: {
      category: {
        populate: ['slug'],
      },
      content_page: {
        populate: ['category'],
      },
    },
    filters: {
      $or: [
        {
          title: {
            $containsi: searchParam,
          },
        },
        {
          content: {
            $containsi: searchParam,
          },
        },
      ],
    },
    pagination: {
      page: 1,
      pageSize: 25,
    },
  })

  const privateCategoryQuery = qs.stringify({
    populate: {
      category: {
        populate: ['slug'],
      },
      private_page: {
        populate: ['category'],
      },
    },
    filters: {
      $or: [
        {
          title: {
            $containsi: searchParam,
          },
        },
        {
          content: {
            $containsi: searchParam,
          },
        },
      ],
    },
    pagination: {
      page: 1,
      pageSize: 25,
    },
  })

  // Fetch public data
  const [publicSectionRes, publicPageRes] = await Promise.all([
    fetchCollection<Section>('/content-sections', {
      query: categoryQuery,
    }),
    fetchCollection<PageType>('/content-pages', {
      query: categoryQuery,
    }),
  ])

  let privateSectionRes = null
  let privatePageRes = null

  // Conditionally fetch private data if sessionToken is available
  if (sessionToken) {
    ;[privateSectionRes, privatePageRes] = await Promise.all([
      fetchCollection<Section>('/private-sections', {
        query: privateCategoryQuery,
        headers: { Authorization: `Bearer ${sessionToken}` },
      }),
      fetchCollection<PageType>('/private-pages', {
        query: privateCategoryQuery,
        headers: { Authorization: `Bearer ${sessionToken}` },
      }),
    ])
  }
  // Type guards to ensure the data is of the expected type
  const isSectionArray = (data: unknown): data is Section[] =>
    Array.isArray(data) &&
    data.every((item) => 'id' in item && 'attributes' in item)
  const isPageArray = (data: unknown): data is SingleResponse<PageType>[] =>
    Array.isArray(data) &&
    data.every(
      (item) => 'data' in item && 'id' in item.data && 'attributes' in item.data
    )

  return {
    sectionData: isSectionArray(publicSectionRes?.data)
      ? publicSectionRes.data
      : [],
    pageData: isPageArray(publicPageRes?.data) ? publicPageRes.data : [],
    privateSectionData: isSectionArray(privateSectionRes?.data)
      ? privateSectionRes.data
      : [],
    privatePageData: isPageArray(privatePageRes?.data)
      ? privatePageRes.data
      : [],
  }
}
