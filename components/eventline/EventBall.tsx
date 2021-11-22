import { NextPage } from 'next'
import { Event } from '../../types'

interface Props {
    event: Event
    eventToShow: Event | null
    setEventToShow: (event: Event | null) => void
}

// TODO: Highlight selected eventBall

/** Ball to be displayed under an verticalLineLong  */
const EventBall: NextPage<Props> = ({ event, eventToShow, setEventToShow }) => (
        // Set eventToShow to null if same ball is pressed twice
        <div onClick={() => { setEventToShow(event === eventToShow ? null : event)}} className={"dot"} />
)


export default EventBall;
