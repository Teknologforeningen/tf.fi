import { Event, GroupedEvent } from '../types'

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

function getWeek(day: Date) {
  const MILLISECONDS_IN_WEEK = 604800000
  const firstDayOfWeek = 1 // monday as the first day (0 = sunday)
  const startOfYear = new Date(day.getFullYear(), 0, 1)
  startOfYear.setDate(
    startOfYear.getDate() + (firstDayOfWeek - (startOfYear.getDay() % 7))
  )
  return (
    Math.round((day.getTime() - startOfYear.getTime()) / MILLISECONDS_IN_WEEK) +
    1
  )
}

// Is this redundant?
function groupEventsByWorkdayAndWeekend(events: Event[]): GroupedEvent {
  // Object to add final group into
  const grouped: GroupedEvent = {}

  // Group by week first
  const groupedByWeek = groupEventsByWeek(events)

  // Then group by workday/weekend
  Object.keys(groupedByWeek).map((weekNum) => {
    groupedByWeek[weekNum].map((event) => {
      const weekDay = new Date(event.date).getDay()

      // If Saturday or Sunday
      if (weekDay === 0 || weekDay == 6) {
        grouped[`${weekNum}-weekend`]
          ? grouped[`${weekNum}-weekend`].push(event)
          : (grouped[`${weekNum}-weekend`] = [event])
      } else {
        grouped[`${weekNum}-weekday`]
          ? grouped[`${weekNum}-weekday`].push(event)
          : (grouped[`${weekNum}-weekday`] = [event])
      }
    })
  })

  return grouped
}

function groupEventsByWeek(events: Event[]): GroupedEvent {
  const cmp = (e: Event) => getWeek(new Date(e.date))
  return groupByGivenCmp(events, cmp)
}

function groupEventsByMonth(events: Event[]): GroupedEvent {
  const cmp = (e: Event) => new Date(e.date).getMonth()
  return groupByGivenCmp(events, cmp)
}

/** Group events depending on numberOfLines */
export function groupEventsByDate(
  events: Event[],
  numberOfLines: number
): GroupedEvent {
  if (numberOfLines >= 365) {
    return groupEventsByDay(events)
  } else if (numberOfLines >= 104) {
    return groupEventsByWorkdayAndWeekend(events)
  } else if (numberOfLines >= 52) {
    return groupEventsByWeek(events)
  } else {
    return groupEventsByMonth(events)
  }
}

/** Calculate how many lines fit on the screen */
export function numberOfLines(
  screenWidth: number,
  lineWidth: number,
  lineGap: number
): number {
  return Math.floor(screenWidth / (2 * lineGap + lineWidth)) - 1 // Remove 1 just to be safe
}

export const makeArray = (length: number) => Array.from(Array(length))