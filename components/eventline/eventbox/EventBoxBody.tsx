import { NextPage } from 'next'
import Column from '../../Column'
import Link from 'next/link'
import { EventBoxProps } from './EventBox'
import EventBoxTitle from './EventBoxTitle'
import EventBoxHorizontalLine from './EventBoxHorizontalLine'

const EventBoxBody: NextPage<EventBoxProps> = ({ event, ...props }) => (
  <Column className="event-box" {...props}>
    <EventBoxTitle event={event} />
    <EventBoxHorizontalLine />
    <p className="event-box-text">{event.description}</p>
    <Link href={`/${event.slug}`}>
      <a className="event-box-link">LÄS MERA</a>
    </Link>
  </Column>
)

export default EventBoxBody
