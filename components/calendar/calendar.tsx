import React, { useEffect, useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import svLocale from '@fullcalendar/core/locales/sv'
import { EventSourceInput } from '@fullcalendar/core'

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
    <div className="flex h-[700px] w-[100%] flex-col p-5 md:w-[50%]">
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={data}
        eventColor="#B20738"
        eventTextColor="white"
        eventBackgroundColor="#B20738"
        eventClick={(info) => window.open(info.event.extendedProps.htmlLink)}
        height="100%"
        firstDay={1}
        locale={svLocale}
        datesSet={(arg) => setDate(arg.start)}
      />
    </div>
  )
}

export default CalendarComponent
