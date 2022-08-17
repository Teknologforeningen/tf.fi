import classNames from 'classnames'
import { NextPage } from 'next'
import { EventType, HideableEvent } from '../../types'

interface Props {
  eventId: number
  eventType: EventType
  eventsToShow: HideableEvent[]
  setEventsToShow: (event: HideableEvent[]) => void
}

/** Ball to be displayed under an verticalLineLong  */
const EventBall: NextPage<Props> = ({
  eventId,
  eventType,
  eventsToShow,
  setEventsToShow,
}) => {
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
        'rounded-full inline-block mt-2 relative -left-[5px]',
        eventType === 'event' ? 'bg-eventblue' : 'bg-blogpink',
        isHidden() ? 'h-[.95rem] w-[.95rem]' : 'h-[1.2rem] w-[1.2rem]'
      )}
    />
  )
}

export default EventBall
