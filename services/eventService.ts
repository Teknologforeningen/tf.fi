import { Event as TimelineEvent } from '../types'
import { fetchMultiple } from './fetchService'

export async function fetchEvents(): Promise<TimelineEvent[]> {
  return fetchMultiple<TimelineEvent>('/events')
}
