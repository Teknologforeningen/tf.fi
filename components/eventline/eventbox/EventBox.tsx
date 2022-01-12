import { NextPage } from 'next'
import Link from 'next/link'
import { HideableEvent } from '../../../types'
import EventBoxTitle from './EventBoxTitle'
import EventBoxBody from './EventBoxBody'

export interface EventBoxProps {
  event: HideableEvent
  topMargin?: boolean
  [key: string]: unknown
}

interface Props {
  events: HideableEvent[]
}

/** Box where a short description and title of an event can be displayed */
const EventBox: NextPage<Props> = ({ events }) =>
  events.length == 1 ? (
    <EventBoxBody event={events[0]} />
  ) : (
    <>
      {events.map((event) => (
        <Link key={event.id} href={`/${event.slug}`}>
          <a>
            <EventBoxTitle event={event} topMargin />
          </a>
        </Link>
      ))}
    </>
  )

export default EventBox
