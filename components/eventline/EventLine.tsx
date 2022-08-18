import { Event, HideableEvent } from '../../types'
import VerticalLineLong from './VerticalLineLong'
import Column from '../Column'
import Row from '../Row'
import EventBall from './EventBall'
import EventBox from './eventbox/EventBox'
import { useState } from 'react'

type Props = {
  events: Event[]
  ref?: React.RefObject<typeof EventLine>
}

/** An EventLine consists of 1 VerticalLineLong and arbitary number of EventBalls.
 *  Events are grouped by date
 */
const EventLine = ({ events }: Props) => {
  const hidableEvents = (events as HideableEvent[]).map((event) => ({
    ...event,
    hide: false,
  }))

  const [eventsToShow, setEventsToShow] =
    useState<HideableEvent[]>(hidableEvents)

  const formattedDate = new Date(events[0].date)
    .toLocaleDateString('en-GB')
    .slice(0, 5)
    .replace('/', '.')

  return (
    <Column className="relative">
      <div className="relative -left-[5px] mt-4 font-extrabold text-creamwhite">
        {formattedDate}
      </div>
      <VerticalLineLong />
      <Row className="absolute top-44 z-10 w-20 justify-evenly">
        {events.map((event) => (
          <EventBall
            key={event.id}
            eventId={event.id}
            eventType={event.type}
            eventsToShow={eventsToShow}
            setEventsToShow={setEventsToShow}
          />
        ))}
      </Row>

      {/*
      Show EventBox by default
      only hide eventBox if selected event is in current line's events
      */}

      <Column className="absolute top-[200px] z-10 h-[217px] w-[224px] descendant:w-full">
        <EventBox events={eventsToShow.filter((event) => !event.hide)} />
      </Column>
    </Column>
  )
}

export default EventLine
