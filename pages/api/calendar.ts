import fs from 'fs/promises'
import path from 'path'
import { calendar_v3, google } from 'googleapis'
import { CalendarEvent } from '../../models/event'

// If modifying these scopes, update the service account permissions.
const SCOPES = ['https://www.googleapis.com/auth/calendar.readonly']
const CREDENTIALS_PATH = path.join(process.cwd(), 'credentials.json')

/**
 * Loads the service account credentials from the JSON file.
 *
 * @return {Promise<Object>}
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function loadServiceAccountCredentials(): Promise<any> {
  const content = await fs.readFile(CREDENTIALS_PATH)
  return JSON.parse(content.toString())
}

/**
 * Lists the next 10 events on the specified calendar.
 * @param {google.auth.JWT} auth An authorized JWT client.
 * @param {string} calendarId The ID of the calendar to fetch events from.
 */
async function listEvents(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  auth: any,
  calendarId: string
): Promise<calendar_v3.Schema$Event[]> {
  const calendar = google.calendar({ version: 'v3', auth })
  const res = await calendar.events.list({
    calendarId,
    //TODO fix dynamic date range based on selected calendar date
    //then max results can also be reduced
    timeMin: new Date(
      new Date().getTime() - 80 * 24 * 60 * 60 * 1000
    ).toISOString(), //get date 80 days ago
    maxResults: 100,
    singleEvents: true,
    orderBy: 'startTime',
  })
  const events = res.data.items

  //no events found
  if (!events || events.length === 0) {
    return []
  }

  return events
}

export const getCalendarEvents = async (
  calendarId: string
): Promise<CalendarEvent[]> => {
  try {
    const credentials = await loadServiceAccountCredentials()
    const auth = new google.auth.JWT(
      credentials.client_email,
      undefined,
      credentials.private_key,
      SCOPES
    )
    await auth.authorize()
    const res = await listEvents(auth, calendarId)

    const data =
      res.map((event, i) => ({
        id: event.id || i.toString(),
        title: event.summary,
        start: event.start?.dateTime?.slice(0, 10) || null,
        end: event.end?.dateTime?.slice(0, 10) || null,
        htmlLink: event.htmlLink,
      })) || []
    return data
  } catch (err) {
    console.log(err)
    return []
  }
}
