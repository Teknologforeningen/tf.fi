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
  type: string
}

export type GroupedEvent = Record<string, Event[]>

type PlainLine = {
  id: number
  date: string
}

export type Line = Event[] | PlainLine
