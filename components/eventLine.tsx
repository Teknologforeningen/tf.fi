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
    return (
        <Column>
            <VerticalLineLong/>
            {events.map((event) => {
                <EventBall key={event.id} />
            })}
            {events.map((event) => {
                <EventBox event={event} />
            })}

        </Column>
    )
    };

export default EventBox;