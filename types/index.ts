export type EventType = 'event' | 'blogpost'

export interface Event {
  id: number
  title: string
  slug: string
  date: string
  content?: string
  description?: string
  published_at: string
  created_at: string
  updated_at: string
  type: EventType
}

export type GroupedEvent = Record<string, Event[]>

export type HideableEvent = Event & { hide: boolean }

type PlainLine = {
  id: number
  date: string
}

export type Line = Event[] | PlainLine

export interface Flag {
  title: string
  onoff: boolean
}
