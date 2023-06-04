import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import svLocale from '@fullcalendar/core/locales/sv'
import { EventSourceInput } from '@fullcalendar/core'

//remove hardcoded colors
const CalendarComponent = ({
  calendarEvents,
}: {
  calendarEvents: EventSourceInput
}) => {
  return (
    <div className="rounded-m w-[50%] p-5">
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={calendarEvents}
        eventColor="#B20738"
        eventTextColor="white"
        eventBackgroundColor="#B20738"
        eventClick={(info) => window.open(info.event.extendedProps.htmlLink)}
        height={700}
        firstDay={1}
        locale={svLocale}
      />
    </div>
  )
}

export default CalendarComponent
