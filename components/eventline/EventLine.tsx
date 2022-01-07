import { NextPage } from 'next'
import moment from 'moment'
import { Event } from '../../types'
import VerticalLineLong from './VerticalLineLong'
import Column from '../Column'
import Row from '../Row'
import EventBall from './EventBall'
import EventBox from './EventBox'

interface Props {
  events: Event[]
  eventsToShow: Event[] | null
  setEventsToShow: (events: Event[] | null) => void
}

/** An EventLine consists of 1 VerticalLineLong and arbitary number of EventBalls.
 *  Events are grouped by date
 * */
const EventLine: NextPage<Props> = ({
  events,
  eventsToShow,
  setEventsToShow,
}) => (
  <Column>
    <div className={'eventline-dates'}>
      {moment(events[0].date).format('DD.MM')}
    </div>
    <VerticalLineLong />
    <Row className={'ball-row'}>
      {events.map((event) => (
        <EventBall
          setEventsToShow={setEventsToShow}
          event={event}
          eventsToShow={eventsToShow}
          key={event.id}
        />
      ))}
    </Row>

    {/*
      Show EventBox by default
      only hide eventBox if selected event is in current line's events
    */}

    <Column className={'event-box-parent'}>
      {eventsToShow?.map(
        (event) =>
          events.includes(event) && (
            <EventBox
              key={event.id}
              event={event}
              onlyTitle={events.length > 1}
            />
          )
      )}
    </Column>
  </Column>
)

export default EventLine
