export type EventType = 'event' | 'blogpost'

export type Event = {
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

//compatable with FullCalendar event type
export type CalendarEvent = {
  id: string | null | undefined
  title: string | null | undefined
  start: string | null | undefined
  end: string | null | undefined
  htmlLink: string | null | undefined
}
