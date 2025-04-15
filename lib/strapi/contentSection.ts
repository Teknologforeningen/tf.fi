import qs from 'qs'
import { PageType, Section } from '@models/page'
import { fetchSingle } from '@lib/strapi/index'

type PopulatedSection = Section & {
  content_page: PageType
}

export async function fetchSection(id: number): Promise<PopulatedSection | null> {
  const query = qs.stringify({
    populate: {
      content_page: {
        populate: ['category'],
      },
    },
  })

  const res = await fetchSingle<PopulatedSection>(`/content-sections/${id}`, {
    query,
  })
  return !res?.data?.documentId || !res?.data ? null : res.data
}
