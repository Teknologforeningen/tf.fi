import { NextPage } from 'next'
import { Event, Line } from '../../types'
import { UIEventHandler, useState } from 'react'
import { groupEventsByDate, makeLines } from '../../utils'
import EventLine from './EventLine'
import VerticalLine from './VerticalLine'
import Row from '../Row'

// receives events as props
interface Props {
  events: Event[]
  setHorizontalPosition: (n: number) => void
}

/** A timeline of all events. Days which contain events have a longer line with EventBall(s) under it */
const Timeline: NextPage<Props> = ({ events, setHorizontalPosition }) => {
  const eventsByDate = groupEventsByDate(events)
  const numOfEventLines = Object.keys(eventsByDate).length
  /**
   * If there is only one event line, and we have 40 lines between we get a total of 80 lines.
   * This is not enough to overflow the screen, and we miss out on the scroll effect.
   * Already with two events we get 120 lines, which is enough.
   */
  const linesBetween = numOfEventLines === 1 ? 120 : 40
  const totalLines = linesBetween + numOfEventLines * linesBetween

  const lines: Line[] = makeLines(eventsByDate, linesBetween)

  const [lineHeights, setLineHeights] = useState<number[]>(
    Array.from(Array(totalLines * 10)).map(() => 1)
  )

  const handleScroll: UIEventHandler<HTMLDivElement> = (e) => {
    setHorizontalPosition(e.currentTarget.scrollLeft)
  }

  const onHover = (n: number) => {
    const transformMap = Object.fromEntries(
      [1.05, 1.1, 1.2, 1.3, 1.4, 1.8, 2.5, 1.8, 1.4, 1.3, 1.2, 1.1, 1.05].map(
        (scale, i) => [n + i - 6, scale]
      )
    )
    setLineHeights(lineHeights.map((l, i) => transformMap[i] ?? 1))
  }

  return (
    <div
      className={'timeline-container hide-scrollbars'}
      onScroll={handleScroll}
    >
      <Row className={'timeline'}>
        {lines.map((line, index) => (
          <div key={index}>
            {line instanceof Array ? (
              <EventLine events={line} />
            ) : (
              <VerticalLine
                onHover={onHover}
                i={index}
                verticalSize={lineHeights[index]}
              />
            )}
          </div>
        ))}
      </Row>
    </div>
  )
}

export default Timeline
