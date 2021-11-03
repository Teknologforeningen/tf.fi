import { NextPage } from 'next';
import { Event } from '../types'

interface Props {
    event: Event
}

const EventBox: NextPage<Props> = ({ event }) => {
    return (
        <div className="event-box">
            {event.title}
        </div>
    )
    };

export default EventBox;
