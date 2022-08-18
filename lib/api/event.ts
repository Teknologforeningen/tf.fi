import { Event as TimelineEvent } from '../../models/event'
import { fetchMultiple } from './index'

export async function fetchEvents(): Promise<TimelineEvent[]> {
  return fetchMultiple<TimelineEvent>('/events')
}
