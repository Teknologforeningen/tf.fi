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

/** An EventLine consists of 1 VerticalLineLong and arbitary number of EventBalls.
 *  Events are grouped by date
 * */
const EventLine: NextPage<Props> = ({ events, eventToShow, setEventToShow }) => (
    <Column center>
        <VerticalLineLong/>
        {events.map((event) => (
            <EventBall setEventToShow={setEventToShow} event={event} eventToShow={eventToShow} key={event.id} />
        ))}
        {/*
            Hide EventBox by default
            only show eventBox if selected event is in current line's events
         */}
        <div className={'event-box-parent'}>
            {eventToShow !== null && events.indexOf(eventToShow) >= 0 &&
            <EventBox event={eventToShow}/>
            }
        </div>
    </Column>
)

export default EventLine;
