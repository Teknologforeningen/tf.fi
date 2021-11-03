
import VerticalLine from "./verticalLine";
import VerticalLineLong from './verticalLineLong';
import Row from "./row";
import { NextPage } from 'next';
import EventLine from './eventLine'
import { Event } from '../types'

// recieves events as props
interface Props {
    events: Event[]
}

const Timeline: NextPage<Props> = ({ events }) => {
    
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
            // Group events by date and pass to eventLine as props
            return (
                <Row key={i}>
                    {[...Array(8)].map((i) => (<VerticalLine key={i}/>))}
                    <EventLine events={e}/>
                </Row>
            )
            
        })}
        
    </Row>
)
};

export default Timeline;
