import { NextPage } from 'next'
import { Event } from '../types'

interface Props {
    event: Event
    eventToShow: Event | null
    setEventToShow: (event: Event | null) => void
}

const EventBall: NextPage<Props> = ({ event, eventToShow, setEventToShow }) => (
        <div onClick={() => { setEventToShow(event === eventToShow ? null : event)}} className={"dot"} />
)


export default EventBall;
