import { NextPage } from 'next'
import Column from '../../Column'
import { EventBoxProps } from './EventBox'
import Link from 'next/link'

const EventBoxTitle: NextPage<EventBoxProps> = ({
  event,
  topMargin = false,
  ...props
}) => (
  <Column
    className={`event-box-small event-box-small-${event.type} ${
      topMargin ? 'top-margin' : ''
    }`}
    {...props}
  >
    <Link key={event.id} href={`/${event.slug}`}>
      <a>
        <p className={`event-box-sub-title`}>
          {event.type === 'event' ? 'EVENEMANG' : 'BLOGINLÄGG'}
        </p>
        <p className={`event-box-title`}>{event.title}</p>
      </a>
    </Link>
  </Column>
)

export default EventBoxTitle
