import React, { useEffect, useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import svLocale from '@fullcalendar/core/locales/sv'
import { EventSourceInput } from '@fullcalendar/core'
import Column from '../Column'

//remove hardcoded colors
const CalendarComponent = () => {
  const [data, setData] = useState<EventSourceInput | undefined>(undefined)
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

  return (
    <Column className="flex w-full justify-center">
      <p className="m-2 pb-5 text-center text-3xl text-white">
        Händelsekalendern
      </p>
      <div className="w-[100%]">
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          events={data}
          eventColor="#B20738"
          eventTextColor="white"
          eventBackgroundColor="#B20738"
          eventClick={(info) => window.open(info.event.extendedProps.htmlLink)}
          firstDay={1}
          locale={svLocale}
          datesSet={(arg) => setDate(arg.start)}
          height={800}
        />
      </div>
    </Column>
  )
}

export default CalendarComponent
