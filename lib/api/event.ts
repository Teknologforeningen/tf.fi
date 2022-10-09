import qs from 'qs'
import { Event as TimelineEvent } from '../../models/event'
import { fetchFromStrapi } from './index'

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

export async function fetchEvents(): Promise<TimelineEvent[]> {
  const res = await fetchFromStrapi<TimelineEvent>('/events')
  if (!(res instanceof Array)) return Promise.reject()
  return res.map((e) => ({ id: e.id, ...e.attributes }))
}
