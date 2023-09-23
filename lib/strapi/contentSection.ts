import qs from 'qs'
import { PageType, Section } from '@models/page'
import { fetchSingle } from '@lib/strapi/index'

type PopulatedSection = Section & {
  attributes: {
    content_page: {
      data: PageType
    }
  }
}

export async function fetchSection(
  id: number
): Promise<PopulatedSection | null> {
  const query = qs.stringify({
    populate: {
      content_page: {
        populate: ['category'],
      },
    },
  })

  const res = await fetchSingle<Section>(`/content-sections/${id}`, {
    query,
  })
  if (!res?.data?.id || !res?.data?.attributes) return null
  return (
    ({
      id: res.data.id,
      attributes: res.data.attributes,
    } as unknown as PopulatedSection) ?? null
  )
}
