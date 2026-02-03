'use client'

import { useEffect, useState } from 'react'
import Calendar from 'react-calendar'
import Column from '@components/Column'
import ActivityIndicator from '@components/ActivityIndicator'
import { getDateShort } from '@utils/helpers'
import Link from 'next/link'
import { CalendarEvent } from '@lib/google/calendar'

type InteractiveCalendarProps = {
  fetchEvents: (date: Date) => Promise<CalendarEvent[]>
}

const InteractiveCalendar = ({ fetchEvents }: InteractiveCalendarProps) => {
  /** `fetchEvents` always returns an empty array, so we can use `undefined` to represent a loading state. */
  const [events, setEvents] = useState<CalendarEvent[] | undefined>(undefined)
  const [date, setDate] = useState(new Date())

  useEffect(() => {
    fetchEvents(date).then((data) => {
      setEvents(data)
    })
  }, [date, fetchEvents])

  const isActive = (item: CalendarEvent, date: Date) => {
    const start = new Date(item.start?.split('T')[0] + 'T00:00:00')
    const end = new Date(item.end?.split('T')[0] + 'T23:59:59')
    return start <= date && date <= end
  }

  const setClass = (date: Date) => {
    const a = events?.some((e) => isActive(e, date))
    return a ? 'eventInDate' : ''
  }

  return (
    <>
      <div className="mt-4 flex max-w-[400px] items-center self-center rounded-md border-[1px] border-teknologröd bg-white p-5 pb-5 shadow-md">
        <Calendar
          tileClassName={({ date }) => setClass(date)}
          minDetail="month"
          locale="sv"
          next2Label={null}
          prev2Label={null}
          onActiveStartDateChange={({ activeStartDate }) => activeStartDate && setDate(activeStartDate)}
          onClickDay={(value) => setDate(value)}
        />
      </div>
      <CalendarEventsList
        events={
          events
            ?.filter((e) => e.start && e.end && (new Date(e.start) >= date || new Date(e.end) >= date))
            .slice(0, 5) ?? []
        }
        isLoading={events === undefined}
      />
    </>
  )
}

const CalendarEventsList = ({ events, isLoading }: { events: CalendarEvent[]; isLoading: boolean }) => (
  <Column className="mt-2 flex min-h-[380px] w-full">
    {isLoading && events.length < 1 ? (
      <ActivityIndicator width={25} height={25} stroke="black" />
    ) : (
      events.map((e) => {
        const start = e.start && getDateShort(e.start)
        const end = e.end && getDateShort(e.end)
        return (
          <Link
            key={e.id}
            className="highlight border-1 duration-50 my-1.5 w-full max-w-[390px] rounded-md bg-white p-2 shadow transition-colors ease-in-out hover:bg-lightGray"
            href={e.htmlLink}
          >
            <p className="text-bold text-teknologröd">{e.title}</p>
            <p>{start + (start !== end ? ' - ' + end : ' ')}</p>
          </Link>
        )
      })
    )}
  </Column>
)

export default InteractiveCalendar
