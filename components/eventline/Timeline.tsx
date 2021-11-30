import VerticalLine from './VerticalLine'
import Row from '../Row'
import { NextPage } from 'next'
import EventLine from './EventLine'
import { Event } from '../../types'
import { useState } from 'react'
import { groupEventsByDate, numberOfLines } from '../../utils'
import useWindowSize from '../../hooks/useWindowSize'

// receives events as props
interface Props {
  events: Event[]
}

/** A timeline of all events. Days which contain events have a longer line with EventBall(s) under it */
const Timeline: NextPage<Props> = ({ events }) => {
  const [eventToShow, setEventToShow] = useState<Event | null>(null)
  const { width } = useWindowSize()

  // How many lines can fit on page, or if width is not defined then 2*numberOfWeeksInYear
  const numOfLines = width ? numberOfLines(width, 1.5, 5) : 104
  const [lineHeights, setLineHeights] = useState<number[]>(Array.from(Array(numOfLines)).map(() => 1))

  const grouped = groupEventsByDate(events, numOfLines)
  const numOfEventLines = Object.keys(grouped).length
  const verticalLinesBetween = Math.round(
    (numOfLines - numOfEventLines) / (numOfEventLines + 1)
  )

  const onHover = (n: number) => {
    if (n < numOfLines) {
      const transformMap = Object.fromEntries([1.05, 1.1, 1.2, 1.3, 1.4, 1.8, 2.5, 1.8, 1.4, 1.3, 1.2, 1.1, 1.05].map((scale, i) => [n + i - 6, scale]))
      setLineHeights(lineHeights.map((l, i) => transformMap[i] ?? 1))
    }
  }

  return (
    <Row center className={'timeline'}>
      {Object.values(grouped).map((e, i) => {
        return (
          <Row key={i}>
            {[...Array(verticalLinesBetween)].map((i, j) => (
              <VerticalLine key={j} onHover={onHover} i={j} verticalSize={lineHeights[j]} />
            ))}
            <EventLine
              key={i}
              events={e}
              eventToShow={eventToShow}
              setEventToShow={setEventToShow}
            />
          </Row>
        )
      })}
      <Row>
        {[...Array(verticalLinesBetween)].map((i) => (
          <VerticalLine key={i} onHover={onHover} i={i} verticalSize={lineHeights[i]}/>
        ))}
      </Row>
    </Row>
  )
}

export default Timeline
