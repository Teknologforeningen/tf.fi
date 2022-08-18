import { HideableEvent } from '../../../types'
import EventBoxTitle from './EventBoxTitle'
import EventBoxBody from './EventBoxBody'

export type EventBoxProps = {
  event: HideableEvent
  topMargin?: boolean
  [key: string]: unknown
}

type Props = {
  events: HideableEvent[]
}

/** Box where a short description and title of an event can be displayed */
const EventBox = ({ events }: Props) =>
  events.length == 1 ? (
    <EventBoxBody event={events[0]} />
  ) : (
    <>
      {events.map((event, i) => (
        <EventBoxTitle key={i} event={event} topMargin />
      ))}
    </>
  )

export default EventBox
