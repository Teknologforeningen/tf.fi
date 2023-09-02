import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Calendar from 'react-calendar'
import Column from './Column'
import Subtitle from './Subtitle'
import { getDateShort } from '@utils/helpers'
import ActivityIndicator from './ActivityIndicator'

// Compatible with FullCalendar event type
export type CalendarEvent = {
  id: string
  title: string | null | undefined
  start: string | null | undefined
  end: string | null | undefined
  htmlLink: string
}

const CalendarComponent = () => {
  const [data, setData] = useState<CalendarEvent[]>([])
  const [date, setDate] = useState(new Date())
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const getAsync = async () => {
      setIsLoading(true)
      const res = await fetch(
        `/api/calendar?calendarId=${process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_ID}&date=${date}`
      )
      const prasedData = await res.json()
      setData(prasedData)

      setIsLoading(false)
    }
    getAsync()
  }, [date])

  const isActive = (item: CalendarEvent, date: Date) => {
    const start = new Date(item.start?.split('T')[0] + 'T00:00:00')
    const end = new Date(item.end?.split('T')[0] + 'T23:59:59')
    return start <= date && date <= end
  }

  const setClass = (date: Date) => {
    const a = data?.some((x) => isActive(x, date))
    return a ? 'eventInDate' : ''
  }

  return (
    <div className="mx-5 flex flex-col py-10 md:py-0">
      <Subtitle>Händelsekalendern</Subtitle>
      <div className="mt-4 flex max-w-[400px] items-center self-center rounded-md bg-white p-5 pb-5 shadow-md">
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
        events={data
          ?.filter(
            (x) =>
              x.start &&
              x.end &&
              (new Date(x.start) >= date || new Date(x.end) >= date)
          )
          .slice(0, 5)}
        isLoading={isLoading}
      />
    </div>
  )
}

const CalendarEventsList = ({
  events,
  isLoading,
}: {
  events: CalendarEvent[]
  isLoading: boolean
}) => (
  <Column className="mt-2 flex w-full">
    {isLoading && events.length < 1 ? (
      <ActivityIndicator width={25} height={25} stroke="white" />
    ) : (
      events.map((x) => {
        const start = x.start && getDateShort(x.start)
        const end = x.end && getDateShort(x.end)
        return (
          <Link
            key={x.id}
            className="highlight border-1 my-1.5 w-full max-w-[390px] rounded-md border-teknologröd bg-white p-2 shadow-md hover:bg-lightGray"
            href={x.htmlLink}
          >
            <p className="text-bold text-teknologröd">{x.title}</p>
            <p>{start + (start !== end ? ' - ' + end : '')}</p>
          </Link>
        )
      })
    )}
  </Column>
)

export default CalendarComponent
