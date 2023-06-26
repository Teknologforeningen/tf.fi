import qs from 'qs'
import { Event as TimelineEvent } from '../../models/event'
import { API_URL, fetchFromStrapi } from './index'
import { EVENT_PAGE_SIZE } from '../../utils/constants'

export async function fetchEvent(slug?: string): Promise<TimelineEvent> {
  const query = slug
    ? qs.stringify({
        filters: {
          slug: {
            $eq: slug,
          },
        },
      })
    : ''
  const events = await fetchFromStrapi<TimelineEvent>(`/events?${query}`)
  if (!(events instanceof Array)) return Promise.reject()
  else if (events.length === 0) return Promise.reject()

  const event = events[0]
  return { id: event.id, ...event.attributes }
}

type EventsResponse = {
  data: TimelineEvent[]
  totalPages: number
}

export async function fetchEvents(page?: number): Promise<EventsResponse> {
  const res = await fetch(
    API_URL +
      '/events' +
      (page
        ? `?pagination[page]=${page}&pagination[pageSize]=${EVENT_PAGE_SIZE}`
        : '')
  )

  const parsed = await res.json()
  const data = parsed.data
  if (!(data instanceof Array)) return Promise.reject()
  return {
    data: data.map((e) => ({ id: e.id, ...e.attributes })) || [],
    totalPages: parsed.meta.pagination.total || 0,
  }
}
