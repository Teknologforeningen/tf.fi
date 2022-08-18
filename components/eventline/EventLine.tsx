import { Event, EventType, HideableEvent } from '../../types'
import { VerticalLineLong } from './VerticalLine'
import Column from '../Column'
import Row from '../Row'
import EventBox from './EventBox'
import { useState } from 'react'
import classNames from 'classnames'

type EventBallProps = {
  eventId: number
  eventType: EventType
  eventsToShow: HideableEvent[]
  setEventsToShow: (event: HideableEvent[]) => void
}

/** Ball to be displayed under an verticalLineLong  */
const EventBall = ({
  eventId,
  eventType,
  eventsToShow,
  setEventsToShow,
}: EventBallProps) => {
  function handleClick() {
    // If event already in list => remove, else => add
    const event = eventsToShow.find((event) => event.id === eventId)
    // Event should always be defined
    if (event) {
      setEventsToShow(
        eventsToShow.map((e) =>
          e.id !== event.id ? e : { ...e, hide: !event.hide }
        )
      )
    }
  }

  function isHidden() {
    const event = eventsToShow.find((event) => event.id === eventId)
    return event?.hide
  }

  return (
    <div
      onClick={handleClick}
      className={classNames(
        'relative -left-[5px] mt-2 inline-block rounded-full',
        eventType === 'event' ? 'bg-eventblue' : 'bg-blogpink',
        isHidden() ? 'h-[.95rem] w-[.95rem]' : 'h-[1.2rem] w-[1.2rem]'
      )}
    />
  )
}

type EventLineProps = {
  events: Event[]
  ref?: React.RefObject<typeof EventLine>
}

/** An EventLine consists of 1 VerticalLineLong and arbitary number of EventBalls.
 *  Events are grouped by date
 */
const EventLine = ({ events }: EventLineProps) => {
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
