import { Event as TimelineEvent } from '@models/event'
import strapi, { PagePagination } from '@lib/api/strapi'

export const EVENT_PAGE_SIZE = 10

export async function fetchEvent(slug?: string): Promise<TimelineEvent | null> {
  if (slug === undefined) return null
  const res = await strapi.fetchCollectionSingle<TimelineEvent>(`/events`, slug)
  return res?.data?.attributes ?? null
}

type EventsResponse = {
  data: TimelineEvent[]
  totalPages: number
}

export async function fetchEvents(
  page?: number
): Promise<EventsResponse | null> {
  const pagination: PagePagination = {
    page,
    pageSize: EVENT_PAGE_SIZE,
  }

  const res = await strapi.fetchCollection<TimelineEvent>('/events', {
    pagination,
  })

  return {
    data: res?.data?.map((e) => ({ id: e.id, ...e.attributes })) ?? [],
    totalPages: res?.meta?.pagination.total ?? 0,
  }
}
