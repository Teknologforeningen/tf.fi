import { NextPage } from 'next'
import Column from '../../Column'
import { EventBoxProps } from './EventBox'

const EventBoxTitle: NextPage<EventBoxProps> = ({
  event,
  topMargin = false,
  ...props
}) => (
  <Column
    className={`event-box-small ${event.type}-title-container ${
      topMargin ? 'top-margin' : ''
    }`}
    {...props}
  >
    <p className={`event-box-sub-title`}>
      {event.type === 'event' ? 'EVENEMANG' : 'BLOGINLÄGG'}
    </p>
    <p className={`event-box-title`}>{event.title}</p>
  </Column>
)

export default EventBoxTitle
