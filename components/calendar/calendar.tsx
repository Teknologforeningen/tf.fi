import React, { useEffect, useState } from 'react'
import Calendar from 'react-calendar'
import Column from '../Column'
import { CalendarEvent } from '../../models/event'

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
    <Column>
      <p className="m-2 pb-5 text-center text-3xl text-white">
        Händelsekalendern
      </p>
      <div className="rounded-md bg-white p-5 pb-5 shadow-md">
        <Calendar
          tileClassName={({ date }) => setClass(date)}
          minDetail="month"
          locale="sv"
          next2Label={null}
          prev2Label={null}
          onActiveStartDateChange={({ activeStartDate }) =>
            activeStartDate && setDate(activeStartDate)
          }
          onClickDay={(date, event) => {
            console.log(event)
            setDate(date)
          }}
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
            console.log(date)
            return (
              <a
                key={x.id}
                className="highlight my-1.5 w-full max-w-[390px] rounded-md border-[2px] border-lightGray bg-white p-2 text-black shadow-md hover:bg-lightGray"
                href={x.htmlLink}
              >
                {x.title}
                <br />
                {x.start?.split('T')[0] +
                  (x.start?.split('T')[0] !== x.end?.split('T')[0]
                    ? ' - ' + x.end?.split('T')[0]
                    : '')}
              </a>
            )
          })}
      </Column>
    </Column>
  )
}

export default CalendarComponent
