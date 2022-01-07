import { Event as TimelineEvent } from '../types'
import { fetchMultiple } from './index'

export async function fetchEvents(): Promise<TimelineEvent[]> {
  return fetchMultiple<TimelineEvent>('/events')
}
