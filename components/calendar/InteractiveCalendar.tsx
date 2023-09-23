'use client'

import { CalendarEvent } from '@components/calendar/Calendar'
import React, { useEffect, useState } from 'react'
import Calendar from 'react-calendar'
import Column from '@components/Column'
import ActivityIndicator from '@components/ActivityIndicator'
import { getDateShort } from '@utils/helpers'
import Link from 'next/link'

type InteractiveCalendarProps = {
  initialEvents: CalendarEvent[]
  initialDate: Date
  fetchEvents: (date: Date) => Promise<CalendarEvent[]>
}

const InteractiveCalendar = ({
  initialEvents,
  initialDate,
  fetchEvents,
}: InteractiveCalendarProps) => {
  const [events, setEvents] = useState(initialEvents)
  const [date, setDate] = useState(initialDate)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (date.getTime() === initialDate.getTime()) {
      return
    }

    setIsLoading(true)
    fetchEvents(date).then((data) => {
      setEvents(data)
      setIsLoading(false)
    })
  }, [initialDate, date, fetchEvents])

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
          onActiveStartDateChange={({ activeStartDate }) =>
            activeStartDate && setDate(activeStartDate)
          }
          onClickDay={(value) => setDate(value)}
        />
      </div>
      <CalendarEventsList
        events={events
          ?.filter(
            (e) =>
              e.start &&
              e.end &&
              (new Date(e.start) >= date || new Date(e.end) >= date)
          )
          .slice(0, 5)}
        isLoading={isLoading}
      />
    </>
  )
}

const CalendarEventsList = ({
  events,
  isLoading,
}: {
  events: CalendarEvent[]
  isLoading: boolean
}) => (
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
