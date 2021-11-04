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
                <h2 className={"card-title"}>{event.title}</h2>
                <div>{event.description}</div>
            </Column>
        </div>
    )
    };

export default EventBox;
