import qs from 'qs'
import { fetchCollection, SingleResponse } from '.'
import { PageType, Section } from '@models/page'

export type SearchData = {
  sectionData: Section[]
  pageData: SingleResponse<PageType>[]
}

export async function searchPublic(searchParam: string): Promise<SearchData> {
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
      pageSize: 20,
    },
  })
  const sectionRes = await fetchCollection<Section>('/content-sections', {
    query: categoryQuery,
  })

  const pageRes = await fetchCollection<PageType>('/content-pages', {
    query: categoryQuery,
  })

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
    sectionData: isSectionArray(sectionRes?.data) ? sectionRes.data : [],
    pageData: isPageArray(pageRes?.data) ? pageRes.data : [],
  }
}
