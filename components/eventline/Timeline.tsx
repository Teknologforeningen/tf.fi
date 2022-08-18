import { Event, Line } from '../../types'
import React, { useEffect, useState } from 'react'
import { groupEventsByDate, makeLines } from '../../utils'
import EventLine from './EventLine'
import { VerticalLine } from './VerticalLine'
import Row from '../Row'
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react'

// receives events as props
type Props = {
  events: Event[]
  setHorizontalPosition: (n: number) => void
}

/** A timeline of all events. Days which contain events have a longer line with EventBall(s) under it
 *  React.memo is used to avoid rerender
 * */
// eslint-disable-next-line react/display-name
const Timeline = React.memo(({ events, setHorizontalPosition }: Props) => {
  const eventsByDate = groupEventsByDate(events)
  const numOfEventLines = Object.keys(eventsByDate).length

  const scrollRef = React.createRef<OverlayScrollbarsComponent>()
  const scrollTargetRef = React.createRef<HTMLDivElement>()

  useEffect(() => {
    const osInstance = scrollRef.current?.osInstance()
    const targetLine = scrollTargetRef.current
    if (osInstance && targetLine) {
      osInstance.scroll({ el: targetLine, margin: 200 })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- Run only on initial render
  }, [])

  /*
   * If there is only one event line, and we have 40 lines between we get a total of 80 lines.
   * This is not enough to overflow the screen, and we miss out on the scroll effect.
   * When using 40 lines between, the distance between event lines is great enough on mobile.
   * With two events we get 120 lines, which is enough.
   */
  const linesBetween = numOfEventLines === 1 ? 120 : 40
  const totalLines = linesBetween + numOfEventLines * linesBetween

  const lines: Line[] = makeLines(eventsByDate, linesBetween)

  const [lineHeights, setLineHeights] = useState<number[]>(
    Array.from(Array(totalLines * 10)).map(() => 1)
  )

  const lastLineIndex = lines.length - 1

  // Scroll to next event after current date or last element
  const scrollTargetIndex = lines.findIndex((line, index) => {
    const dateToCheck =
      line instanceof Array ? new Date(line[0].date) : new Date(line.date)
    return dateToCheck > new Date() || index === lastLineIndex
  })

  const onScroll = (e: MouseEvent) => {
    const element = e.target as HTMLDivElement
    setHorizontalPosition(element.scrollLeft)
  }

  const onHover = React.useCallback(
    (n: number) => {
      const transformMap = Object.fromEntries(
        [1.05, 1.1, 1.2, 1.3, 1.4, 1.8, 2.5, 1.8, 1.4, 1.3, 1.2, 1.1, 1.05].map(
          (scale, i) => [n + i - 6, scale]
        )
      )
      setLineHeights(lineHeights.map((_, i) => transformMap[i] ?? 1))
    },
    [lineHeights]
  )

  return (
    <OverlayScrollbarsComponent
      options={{
        scrollbars: { autoHide: 'move', autoHideDelay: 200 },
        callbacks: { onScroll },
      }}
      ref={scrollRef}
      className="os-theme-round-light mt-4 h-[500px] w-full overflow-y-hidden overflow-x-scroll"
    >
      <Row className="w-fit">
        {lines.map((line, index) => (
          <div
            key={index}
            ref={index === scrollTargetIndex ? scrollTargetRef : undefined}
            id={index.toString()}
          >
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
    </OverlayScrollbarsComponent>
  )
})

export default Timeline
