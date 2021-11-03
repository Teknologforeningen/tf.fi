import VerticalLine from "./verticalLine";
import Row from "./row";
import { NextPage } from 'next';
import EventLine from './eventLine'
import { Event } from '../types'
import {useState} from "react";

// receives events as props
interface Props {
    events: Event[]
}

const Timeline: NextPage<Props> = ({ events }) => {
    const [eventToShow, setEventToShow] = useState<Event | null>(null)

    const grouped: Record<string, Event[]> = {}
    // Group Events by Date
    events.forEach((event) => {
        const cmp: string = new Date(event.date).toDateString()
        if (grouped[cmp]) {
            grouped[cmp].push(event)
        } else {
            grouped[cmp] = new Array(event)
        }
    })
    return (
    <Row>
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
