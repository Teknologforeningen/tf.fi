import { Event, GroupedEvent } from '../models/event'
import { Line } from '../models/line'

function groupByGivenCmp(
  events: Event[],
  cmpFn: (e: Event) => string | number
): GroupedEvent {
  const grouped: GroupedEvent = {}
  events.forEach((event) => {
    const cmp = cmpFn(event)
    if (grouped[cmp]) {
      grouped[cmp].push(event)
    } else {
      grouped[cmp] = new Array(event)
    }
  })
  return grouped
}

function groupEventsByDay(events: Event[]): GroupedEvent {
  const cmp = (e: Event) => new Date(e.date).toDateString()
  return groupByGivenCmp(events, cmp)
}

/** Group events depending on numberOfLines */
export function groupEventsByDate(events: Event[]): GroupedEvent {
  return groupEventsByDay(events)
}

export const makeArray = (length: number) => Array.from(Array(length))

export function makeLines(
  groupedInput: GroupedEvent,
  numOfLinesBetween: number
): Line[] {
  const sorted = Object.keys(groupedInput).sort(
    (a, b) => new Date(a).getTime() - new Date(b).getTime()
  )

  const re: Line[] = makeArray(numOfLinesBetween).map((_, i) => ({
    id: i,
    date: '',
  }))
  sorted.map((date) => {
    re.push(groupedInput[date])
    Array.from(Array(numOfLinesBetween).keys()).map((i) =>
      re.push({ id: i, date: '' })
    )
  })
  return re
}
