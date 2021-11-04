import { NextPage } from 'next';
import { Event } from '../types'
import Column from "./column";

interface Props {
    event: Event
    [key: string]: any
}

/** Box where a short description and title of an event can be displayed */
const EventBox: NextPage<Props> = ({ event, ...props }) => {
    
    
    
    return (
        <div className="event-box" {...props}>
            <Column>
                <p className="event-box-title">{event.title}</p>
                <div className="event-box-horizontal-line"></div>
                <p className="event-box-text">{event.description}</p>
                <p className="event-box-link">LÄS MERA</p>
        </Column>
        </div>
    )
    };

export default EventBox;
