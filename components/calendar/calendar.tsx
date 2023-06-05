import React, { useEffect, useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import svLocale from '@fullcalendar/core/locales/sv'

//remove hardcoded colors
const CalendarComponent = () => {
  const [data, setData] = useState(null)
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
    <div className="rounded-m w-[50%] p-5">
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={data}
        eventColor="#B20738"
        eventTextColor="white"
        eventBackgroundColor="#B20738"
        eventClick={(info) => window.open(info.event.extendedProps.htmlLink)}
        height={700}
        firstDay={1}
        locale={svLocale}
        datesSet={(arg) => setDate(arg.start)}
      />
    </div>
  )
}

export default CalendarComponent
