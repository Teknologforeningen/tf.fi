import VerticalLine from "./verticalLine";
import Row from "./row";
import { NextPage } from 'next';
import EventLine from './eventLine'
import { Event } from '../types'
import {useState} from "react";
import {groupEventsByDate} from "../utils";

// receives events as props
interface Props {
    events: Event[]
}

/** A timeline of all events. Days which contain events have a longer line with EventBall(s) under it */
const Timeline: NextPage<Props> = ({ events }) => {
    const [eventToShow, setEventToShow] = useState<Event | null>(null)

    const grouped = groupEventsByDate(events)

    return (
    <Row center>
            {Object.values(grouped).map((e, i) => {
                return (
                    <Row key={i}>
                        {[...Array(8)].map((i) => (<VerticalLine key={i}/>))}
                        <EventLine events={e} eventToShow={eventToShow} setEventToShow={setEventToShow}/>
                    </Row>
                )
            })}
            <Row>
            {[...Array(8)].map((i) => (<VerticalLine key={i}/>))}
            </Row>
    </Row>
)
};

export default Timeline;
