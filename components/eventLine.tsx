import { useState } from 'react'
import { NextPage } from 'next';
import { Event } from '../types'
import VerticalLineLong from './verticalLineLong'
import Column from './column'
import EventBall from './eventBall'
import EventBox from './eventBox';

interface Props {
    events: Event[]
}

const EventLine: NextPage<Props> = ({ events }) => {

    const [eventToShow, setEventToShow] = useState(events[0])

    return (
        <Column>
            <VerticalLineLong/>
            {events.map((event) => (
                <EventBall setEventToShow={setEventToShow} event={event} key={event.id} />
            ))}
            <EventBox event={eventToShow} />

        </Column>
    )
    };

export default EventLine;