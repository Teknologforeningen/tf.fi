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

export async function searchSiteContent(searchParam: string, sessionToken?: string): Promise<SearchData> {
  const [publicSectionRes, publicPageRes] = await fetchPublicData(searchParam)
  const [privateSectionRes, privatePageRes] = sessionToken
    ? await fetchPrivateData(searchParam, sessionToken)
    : [null, null]

  return {
    sectionData: publicSectionRes?.data ?? [],
    pageData: publicPageRes?.data ?? [],
    privateSectionData: privateSectionRes?.data ?? [],
    privatePageData: privatePageRes?.data ?? [],
  }
}

export const searchDrive = async (
  searchParam: string,
  pageToken?: string,
  pageSize?: number
): Promise<drive_v3.Schema$FileList | null> => {
  try {
    const session = await getServerSession(authOptions)
    const drive = session && session.user ? privateDrive : publicDrive

    if (!drive) {
      throw new Error('Drive instance is not available')
    }

    return drive.searchFiles(searchParam, pageToken, pageSize)
  } catch (err) {
    console.error('Error searching files:', err)
    return null
  }
}

export const getDriveDirectories = async (): Promise<drive_v3.Schema$FileList | null> => {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return null
    }

    if (!privateDrive) {
      throw new Error('Drive instance is not available')
    }
    return privateDrive.getAllDirectories()
  } catch (err) {
    console.error('Error searching files:', err)
    return null
  }
}

const fetchPublicData = async (searchParam: string) => {
  const commonQuery = {
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
  }

  const sectionQuery = qs.stringify({
    ...commonQuery,
    populate: {
      content_page: {
        populate: {
          category: {
            fields: ['slug'],
          },
        },
      },
    },
  })
  const pageQuery = qs.stringify({
    ...commonQuery,
    populate: {
      category: {
        fields: ['slug'],
      },
    },
  })

  return Promise.all([
    fetchCollection<Section>('/content-sections', { query: sectionQuery }),
    fetchCollection<PageType>('/content-pages', { query: pageQuery }),
  ])
}

const fetchPrivateData = async (searchParam: string, sessionToken?: string) => {
  const query = qs.stringify({
    populate: {
      category: {
        fields: ['slug'],
      },
      private_page: {
        fields: ['category'],
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
  return Promise.all([
    fetchCollection<Section>('/private-sections', {
      query,
      headers: { Authorization: `Bearer ${sessionToken}` },
    }),
    fetchCollection<PageType>('/private-pages', {
      query,
      headers: { Authorization: `Bearer ${sessionToken}` },
    }),
  ])
}
