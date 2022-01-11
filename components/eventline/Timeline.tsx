import { NextPage } from 'next'
import { Event, Line } from '../../types'
import { CSSProperties, useState } from 'react'
import { groupEventsByDate, numberOfLines, mkLines } from '../../utils'
import useWindowSize from '../../hooks/useWindowSize'
import { FixedSizeList as List } from 'react-window'
import TimelineLine, { TimelineLineData } from './TimelineLine'

// receives events as props
interface Props {
  events: Event[]
  setHorizontalPosition: (n: number) => void
}

/** A timeline of all events. Days which contain events have a longer line with EventBall(s) under it */
const Timeline: NextPage<Props> = ({ events, setHorizontalPosition }) => {
  const { width } = useWindowSize()

  // How many lines can fit on page, or if width is not defined then 2*numberOfWeeksInYear
  const numOfLines = width ? numberOfLines(width, 1.5, 5) * 2 : 104
  const [lineHeights, setLineHeights] = useState<number[]>(
    Array.from(Array(numOfLines * 10)).map(() => 1)
  )

  const grouped = groupEventsByDate(events)
  const numOfEventLines = Object.keys(grouped).length
  const verticalLinesBetween = Math.round(
    (numOfLines - numOfEventLines) / (numOfEventLines + 1)
  )

  const lines: Line[] = mkLines(grouped, verticalLinesBetween)

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

  const itemSize = 10
  const listWidth = itemSize * numOfLines

  return (
    <div className={'timeline'}>
      <div className={'hide-scrollbars timeline-container'}>
        <List
          height={500}
          width={listWidth}
          itemSize={itemSize}
          itemCount={numOfLines}
          itemData={timelineLineData}
          style={lineStyle}
          layout={'horizontal'}
          className={'hide-scrollbars'}
          onScroll={handleScroll}
        >
          {TimelineLine}
        </List>
      </div>
    </div>
  )
}

export default Timeline
