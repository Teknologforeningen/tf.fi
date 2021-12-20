import VerticalLine from './VerticalLine'
import Row from '../Row'
import { NextPage } from 'next'
import EventLine from './EventLine'
import { Event, Line } from '../../types'
import { useState } from 'react'
import { groupEventsByDate, numberOfLines, mkLines } from '../../utils'
import useWindowSize from '../../hooks/useWindowSize'
import { UIEventHandler } from 'react-transition-group/node_modules/@types/react'

// receives events as props
interface Props {
  events: Event[]
  setHorizontalPosition: (n: number) => void
}

/** A timeline of all events. Days which contain events have a longer line with EventBall(s) under it */
const Timeline: NextPage<Props> = ({ events, setHorizontalPosition }) => {
  const [eventsToShow, setEventsToShow] = useState<Event[] | null>([...events])

  const { width } = useWindowSize()

  // How many lines can fit on page, or if width is not defined then 2*numberOfWeeksInYear
  const numOfLines = width ? numberOfLines(width, 1.5, 5) : 104
  const [lineHeights, setLineHeights] = useState<number[]>(
    Array.from(Array(numOfLines * 10)).map(() => 1)
  )

  const grouped = groupEventsByDate(events)
  const numOfEventLines = Object.keys(grouped).length
  const verticalLinesBetween = Math.round(
    (numOfLines - numOfEventLines) / (numOfEventLines + 1)
  )

  const onHover = (n: number) => {
    const transformMap = Object.fromEntries(
      [1.05, 1.1, 1.2, 1.3, 1.4, 1.8, 2.5, 1.8, 1.4, 1.3, 1.2, 1.1, 1.05].map(
        (scale, i) => [n + i - 6, scale]
      )
    )
    setLineHeights(lineHeights.map((l, i) => transformMap[i] ?? 1))
  }

  const lines: Line[] = mkLines(grouped, verticalLinesBetween)

  const onScroll: UIEventHandler = (event) => {
    console.log(event.currentTarget.scrollBy)
    setHorizontalPosition(event.currentTarget.scrollLeft)
  }

  return (
    <Row onScroll={onScroll} className={'timeline'}>
      {lines.map((line, i) => {
        return (
          <Row key={i}>
            {line instanceof Array ? (
              <EventLine
                key={i}
                events={line}
                eventsToShow={eventsToShow}
                setEventsToShow={setEventsToShow}
              />
            ) : (
              <VerticalLine
                key={i}
                onHover={onHover}
                i={i}
                verticalSize={lineHeights[i]}
              />
            )}
          </Row>
        )
      })}
    </Row>
  )
}

export default Timeline
