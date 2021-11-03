import { NextPage } from 'next';
import { Event } from '../types'
import VerticalLineLong from './verticalLineLong'
import Column from './column'
import EventBall from './eventBall'
import EventBox from './eventBox';

interface Props {
    events: Event[]
    eventToShow: Event | null
    setEventToShow: (event: Event | null) => void
}

const EventLine: NextPage<Props> = ({ events, eventToShow, setEventToShow }) => (
    <Column>
        <VerticalLineLong/>
        {events.map((event) => (
            <EventBall setEventToShow={setEventToShow} event={event} eventToShow={eventToShow} key={event.id} />
        ))}
        {/* Hde EventBox by default */}
        {eventToShow !== null && events.indexOf(eventToShow) >= 0 &&
        <EventBox event={eventToShow}/>
        }
    </Column>
)

export default EventLine;
