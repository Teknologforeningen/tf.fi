import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Calendar from 'react-calendar'
import Column from '../Column'
import { CalendarEvent } from '../../models/event'
import Subtitle from '../subtitle'
import { getDateShort } from '../../utils/helpers'

//remove hardcoded colors
const CalendarComponent = () => {
  const [data, setData] = useState<CalendarEvent[]>([])
  const [date, setDate] = useState(new Date())

  useEffect(() => {
    fetch(
      `/api/calendar?calendarId=${process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_ID}&date=${date}`
    )
      .then((res) => res.json())
      .then((data) => {
        setData(data)
      })
  }, [date])

  const isActive = (item: CalendarEvent, date: Date) => {
    const start = new Date(item.start?.split('T')[0] + 'T00:00:00')
    const end = new Date(item.end?.split('T')[0] + 'T23:59:59')
    return start <= date && end >= date
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
      <Column className=" mt-2 flex w-full">
        {data
          ?.filter(
            (x) =>
              x.start &&
              x.end &&
              (new Date(x.start) >= date || new Date(x.end) >= date)
          )
          .slice(0, 5)
          .map((x) => {
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
          })}
      </Column>
    </div>
  )
}

export default CalendarComponent
