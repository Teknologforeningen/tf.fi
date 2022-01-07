import { NextPage } from 'next'
import { Event } from '../../../types'
import EventBoxTitle from './EventBoxTitle'
import EventBoxBody from './EventBoxBody'

export interface EventBoxProps {
  event: Event
  [key: string]: unknown
}

interface Props {
  event: Event
  [key: string]: unknown
  onlyTitle: boolean
}

/** Box where a short description and title of an event can be displayed */
const EventBox: NextPage<Props> = ({ event, onlyTitle, ...props }) =>
  onlyTitle ? (
    <div>
      <EventBoxTitle event={event} {...props} />
    </div>
  ) : (
    <EventBoxBody event={event} {...props} />
  )

export default EventBox
