import { NextPage } from 'next'
import Link from 'next/link'
import { Event } from '../../types'
import Column from '../Column'

interface Props {
  event: Event
  [key: string]: unknown
}

/** Box where a short description and title of an event can be displayed */
const EventBox: NextPage<Props> = ({ event, ...props }) => (
  <div className="event-box" {...props}>
    <Column>
      <p className={`event-box-title-${event.type}`}>{event.title}</p>
      <div className="event-box-horizontal-line" />
      <p className="event-box-text">{event.description}</p>
      <Link href={event.slug} passHref>
        <a className="event-box-link">LÄS MERA</a>
      </Link>
    </Column>
  </div>
)

export default EventBox
