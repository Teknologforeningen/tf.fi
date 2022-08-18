import { Event } from './event'

type PlainLine = {
  id: number
  date: string
}

export type Line = Event[] | PlainLine
