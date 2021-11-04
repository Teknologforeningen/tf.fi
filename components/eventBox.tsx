import { NextPage } from 'next';
import Link from "next/link";
import { Event } from '../types'
import Column from "./column";

interface Props {
    event: Event
    [key: string]: any
}

/** Box where a short description and title of an event can be displayed */
const EventBox: NextPage<Props> = ({ event, ...props }) => {
    
    
    
    return (
        <Link href={event.slug} passHref>
            <div className="event-box" {...props}>
                <Column>
                    <p className="event-box-title">{event.title}</p>
                    <div className="event-box-horizontal-line"></div>
                    <p className="event-box-text">{event.description}</p>
                <p className="event-box-link" >Läs mera</p>
            </Column>
            </div>
        </Link>
    )
    };

export default EventBox;
