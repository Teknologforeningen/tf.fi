import { NextPage } from 'next'
import Column from '../../Column'
import Link from 'next/link'
import { EventBoxProps } from './EventBox'
import EventBoxTitle from './EventBoxTitle'
import EventBoxHorizontalLine from './EventBoxHorizontalLine'

const EventBoxBody: NextPage<EventBoxProps> = ({ event, ...props }) => (
  <div className="event-box" {...props}>
    <Column className={'event-box-container'}>
      <EventBoxTitle event={event} />
      <EventBoxHorizontalLine />
      <p className="event-box-text">{event.description}</p>
      <div className="event-box-special">
        <Link href={`/${event.slug}`}>
          <a className="event-box-link">LÄS MERA</a>
        </Link>
      </div>
    </Column>
  </div>
)

export default EventBoxBody
