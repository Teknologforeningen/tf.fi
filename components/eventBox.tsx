import { NextPage } from 'next';
import { Event } from '../types'
import Column from "./column";

interface Props {
    event: Event
    [key: string]: any
}

const EventBox: NextPage<Props> = ({ event, ...props }) => {
    return (
        <div className="event-box" {...props}>
            <Column>
                <div><h2 className={"card-title"}>{event.title}</h2></div>
                <div>{event.description}</div>
            </Column>
        </div>
    )
    };

export default EventBox;
