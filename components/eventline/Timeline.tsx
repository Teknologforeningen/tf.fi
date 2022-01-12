import { NextPage } from 'next'
import { Event, Line } from '../../types'
import { CSSProperties, useState } from 'react'
import { groupEventsByDate, mkLines } from '../../utils'
import { FixedSizeList as List } from 'react-window'
import TimelineLine, { TimelineLineData } from './TimelineLine'

// receives events as props
interface Props {
  events: Event[]
  setHorizontalPosition: (n: number) => void
}

/** A timeline of all events. Days which contain events have a longer line with EventBall(s) under it */
const Timeline: NextPage<Props> = ({ events, setHorizontalPosition }) => {
  const eventsByDate = groupEventsByDate(events)
  const numOfEventLines = Object.keys(eventsByDate).length
  const verticalLinesBetween = 40
  const itemSize = 10

  const lines: Line[] = mkLines(eventsByDate, verticalLinesBetween)

  const timelineWidth = itemSize * numOfEventLines * verticalLinesBetween
  const totalLines =
    verticalLinesBetween + numOfEventLines * verticalLinesBetween

  const [lineHeights, setLineHeights] = useState<number[]>(
    Array.from(Array(totalLines * 10)).map(() => 1)
  )

  const timelineLineData: TimelineLineData = {
    lines,
    lineHeights,
    setLineHeights,
  }

  function handleScroll({ scrollOffset }: { scrollOffset: number }) {
    setHorizontalPosition(scrollOffset)
  }

  const lineStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  }

  return (
    <div className={'timeline-container'}>
      <List
        height={475}
        width={timelineWidth}
        itemSize={itemSize}
        itemCount={totalLines}
        itemData={timelineLineData}
        style={lineStyle}
        className={'hide-scrollbars'}
        layout={'horizontal'}
        onScroll={handleScroll}
      >
        {TimelineLine}
      </List>
    </div>
  )
}

export default Timeline
