import { NextPage } from 'next'
import Column from '../../Column'
import Link from 'next/link'
import { EventBoxProps } from './EventBox'

const EventBoxTitle: NextPage<EventBoxProps> = ({ event, ...props }) => (
  <Column
    className={`event-box-small ${event.type}-title-container top-margin`}
    {...props}
  >
    <Link href={event.slug} passHref>
      <a className={`event-box-sub-title`}>
        {event.type === 'event' ? 'EVENEMANG' : 'BLOGINLÄGG'}
      </a>
    </Link>
    <Link href={event.slug} passHref>
      <a className={`event-box-title`}>{event.title}</a>
    </Link>
  </Column>
)

export default EventBoxTitle
