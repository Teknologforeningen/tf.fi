import fs from 'fs/promises'
import path from 'path'
import { calendar_v3, google } from 'googleapis'
import { CalendarEvent } from '../../models/event'
import { NextApiRequest, NextApiResponse } from 'next/types'

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
  calendarId: string,
  date: string
): Promise<calendar_v3.Schema$Event[]> {
  const calendar = google.calendar({ version: 'v3', auth })

  const parsedDate = Date.parse(date)

  const res = await calendar.events.list({
    calendarId,
    //load dates 2 months back and 3 forward
    timeMin: new Date(parsedDate - 1 * 30 * 24 * 60 * 60 * 1000).toISOString(),
    timeMax: new Date(parsedDate + 3 * 30 * 24 * 60 * 60 * 1000).toISOString(),
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
  calendarId: string,
  date: string
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
    const res = await listEvents(auth, calendarId, date)
    const data =
      res.map((event, i) => ({
        id: event.id || i.toString(),
        title: event.summary,
        start: event.start?.dateTime || event.start?.date + 'T00:00:00' || null,
        end: event.end?.dateTime || event.end?.date + 'T23:59:59' || null,
        htmlLink: event.htmlLink || '',
      })) || []
    return data
  } catch (err) {
    console.log(err)
    return []
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    res.status(405).end() // Method Not Allowed
    return
  }

  const { calendarId, date } = req.query

  //enforce and check types
  if (typeof calendarId !== 'string') {
    res.status(400).json({ error: 'Invalid calendar ID' })
    return
  }
  if (typeof date !== 'string') {
    res.status(400).json({ error: 'Invalid date' })
    return
  }

  try {
    const events = await getCalendarEvents(calendarId, date)

    res.status(200).json(events)
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: 'Internal server error' })
  }
}
