import { NextPage } from 'next'
import Link from 'next/link'
import { Event } from '../../types'
import Column from '../Column'

interface Props {
  event: Event
  [key: string]: unknown
  onlyTitle: boolean
}

/** Box where a short description and title of an event can be displayed */
const EventBox: NextPage<Props> = ({ event, onlyTitle, ...props }) =>
  onlyTitle ? (
    <Link href={event.slug} passHref>
      <Column
        className={`event-box-small ${event.type}-title top-margin`}
        {...props}
      >
        <p className={`event-box-sub-title`}>
          {event.type === 'event' ? 'EVENEMANG' : 'BLOGINLÄGG'}
        </p>
        <p className={`event-box-title`}>{event.title}</p>
      </Column>
    </Link>
  ) : (
    <div className="event-box" {...props}>
      <Column>
        <Column className={`event-box-small ${event.type}-title`} {...props}>
          <p className={`event-box-sub-title`}>
            {event.type === 'event' ? 'EVENEMANG' : 'BLOGINLÄGG'}
          </p>
          <p className={`event-box-title`}>{event.title}</p>
        </Column>
        <div className="event-box-horizontal-line" />
        <p className="event-box-text">{event.description}</p>
        <Link href={event.slug} passHref>
          <a className="event-box-link">LÄS MERA</a>
        </Link>
      </Column>
    </div>
  )

export default EventBox
