import { NextPage } from 'next'
import Column from '../../Column'
import Link from 'next/link'
import { EventBoxProps } from './EventBox'

const EventBoxBody: NextPage<EventBoxProps> = ({ event, ...props }) => (
  <div className="event-box" {...props}>
    <Column className={'event-box-container'}>
      <Column
        className={`event-box-small ${event.type}-title-container`}
        {...props}
      >
        <p className={`event-box-sub-title`}>
          {event.type === 'event' ? 'EVENEMANG' : 'BLOGINLÄGG'}
        </p>
        <p className={`event-box-title`}>{event.title}</p>
      </Column>
      <p className="event-box-text">{event.description}</p>
      <div className="event-box-special">
        <Link href={event.slug} passHref>
          <a className="event-box-link">LÄS MERA</a>
        </Link>
      </div>
    </Column>
  </div>
)

export default EventBoxBody
