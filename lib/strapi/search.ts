'use server'
import qs from 'qs'
import { fetchCollection, SingleResponse } from '.'
import { PageType, Section } from '@models/page'
import { publicDrive, privateDrive } from '@lib/google/drive'
import { getServerSession } from 'next-auth'
import { authOptions } from '@lib/nextauth'
import { drive_v3 } from 'googleapis'

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
    data.every((item) => 'id' in item && 'attributes' in item)

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

export const searchDrive = async (
  searchParam: string
): Promise<drive_v3.Schema$File[] | null> => {
  try {
    const session = await getServerSession(authOptions)
    const drive = session && session.user ? privateDrive : publicDrive

    if (!drive) {
      throw new Error('Drive instance is not available')
    }

    const files = await drive.searchFiles(searchParam)

    return files
  } catch (err) {
    console.error('Error searching files:', err)
    return null
  }
}
