import classNames from 'classnames'
import { EventType, HideableEvent } from '../../types'

type Props = {
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
}: Props) => {
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

export default EventBall
