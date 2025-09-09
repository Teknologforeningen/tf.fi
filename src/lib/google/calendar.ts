import { calendar_v3, google } from 'googleapis'

const CALENDAR_ID = process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_ID
const SCOPES = ['https://www.googleapis.com/auth/calendar.readonly']

// Compatible with FullCalendar event type
export type CalendarEvent = {
  id: string
  title: string | null | undefined
  start: string | null | undefined
  end: string | null | undefined
  htmlLink: string
}

let calendar: calendar_v3.Calendar | null = null

const keysEnvVar = process.env.GOOGLE_CREDS
if (!keysEnvVar) {
  console.error('The GOOGLE_CREDS environment variable was not found!')
} else {
  const credentials = JSON.parse(keysEnvVar)
  const auth = new google.auth.JWT(credentials.client_email, undefined, credentials.private_key, SCOPES)
  calendar = google.calendar({ version: 'v3', auth })
}

export default async function listEvents(date: Date): Promise<CalendarEvent[]> {
  if (calendar === null) {
    console.warn('Calendar auth has failed')
    return []
  }

  try {
    const res = await calendar.events.list({
      calendarId: CALENDAR_ID,
      // load dates two months back and three in the future
      timeMin: new Date(date.getTime() - 2 * 30 * 24 * 60 * 60 * 1000).toISOString(),
      timeMax: new Date(date.getTime() + 3 * 30 * 24 * 60 * 60 * 1000).toISOString(),
      maxResults: 100,
      singleEvents: true,
      orderBy: 'startTime',
    })

    const events = res.data.items ?? []
    return events.map((event, i) => ({
      id: event.id || i.toString(),
      title: event.summary,
      start: event.start?.dateTime ?? event.start?.date + 'T00:00:00',
      end: event.end?.dateTime ?? event.end?.date + 'T23:59:59',
      htmlLink: event.htmlLink ?? '',
    }))
  } catch (err) {
    console.log(err)
    return []
  }
}
