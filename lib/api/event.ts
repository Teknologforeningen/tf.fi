import qs from 'qs'
import { Event as TimelineEvent } from '../../models/event'
import { fetchFromStrapi } from './index'

export async function fetchEvent(
  slug?: string
): Promise<TimelineEvent | undefined> {
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

  const event = events[0]
  return event ? { id: event.id, ...event.attributes } : undefined
}

export async function fetchEvents(): Promise<TimelineEvent[]> {
  const res = await fetchFromStrapi<TimelineEvent>('/events')
  return res.map((e) => ({ id: e.id, ...e.attributes }))
}
