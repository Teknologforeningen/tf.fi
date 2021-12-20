import { NextPage } from 'next'
import { Event } from '../../types'

interface Props {
  event: Event
  eventsToShow: Event[] | null
  setEventsToShow: (event: Event[] | null) => void
}

// TODO: Highlight selected eventBall

/** Ball to be displayed under an verticalLineLong  */
const EventBall: NextPage<Props> = ({
  event,
  eventsToShow,
  setEventsToShow,
}) => {
  return (
    // Set eventToShow to null if same ball is pressed twice
    <div
      onClick={() => {
        // If event already in list -> remove, else -> add
        if (eventsToShow !== null) {
          if (eventsToShow.includes(event)) {
            const i = eventsToShow.indexOf(event)
            const copy = [...eventsToShow]
            copy.splice(i, 1)
            setEventsToShow(copy ? copy : null)
          } else {
            let copy = [...eventsToShow]
            copy ? copy.push(event) : (copy = [event])
            setEventsToShow(copy)
          }
        } else {
          setEventsToShow([event])
        }
      }}
      className={`dot-${eventsToShow !== null && eventsToShow.includes(event)}`}
    />
  )
}

export default EventBall
