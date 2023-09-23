import React from 'react'
import Subtitle from '@components/Subtitle'
import listEvents from '@lib/google/calendar'
import InteractiveCalendar from '@components/calendar/InteractiveCalendar'

const CALENDAR_ID = process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_ID

// Compatible with FullCalendar event type
export type CalendarEvent = {
  id: string
  title: string | null | undefined
  start: string | null | undefined
  end: string | null | undefined
  htmlLink: string
}

const Calendar = async () => {
  const now = new Date()
  const events = await listEvents(CALENDAR_ID ?? '', now)

  const fetchMore = async (date: Date): Promise<CalendarEvent[]> => {
    'use server'
    return listEvents(CALENDAR_ID ?? '', date)
  }

  return (
    <div className="mx-5 flex flex-col py-10 md:py-0">
      <div className="self-center md:self-auto">
        <Subtitle underline={false}>Händelsekalendern</Subtitle>
      </div>
      <InteractiveCalendar
        initialEvents={events}
        initialDate={now}
        fetchEvents={fetchMore}
      />
    </div>
  )
}

export default Calendar
