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
const EventBox: NextPage<Props> = ({ event, onlyTitle, ...props }) => {
  if (onlyTitle) {
    return (
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
  } else {
    return (
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
          <div className="event-box-horizontal-line" />
          <p className="event-box-text">{event.description}</p>
          <div className="event-box-special">
            <Link href={event.slug} passHref>
              <a className="event-box-link">LÄS MERA</a>
            </Link>
          </div>
        </Column>
      </div>
    )
  }
}
export default EventBox
