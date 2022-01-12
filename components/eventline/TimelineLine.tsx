import EventLine from './EventLine'
import VerticalLine from './VerticalLine'
import { Line } from '../../types'
import { CSSProperties } from 'react'

export interface TimelineLineData {
  lines: Line[]
  lineHeights: number[]
  setLineHeights: (heigts: number[]) => void
}

interface Props {
  index: number
  style: CSSProperties | undefined
  data: TimelineLineData
}

/** Either an Eventline or VerticalLine depending on data received */
const TimelineLine = ({ index, style, data }: Props): JSX.Element => {
  const onHover = (n: number) => {
    const transformMap = Object.fromEntries(
      [1.05, 1.1, 1.2, 1.3, 1.4, 1.8, 2.5, 1.8, 1.4, 1.3, 1.2, 1.1, 1.05].map(
        (scale, i) => [n + i - 6, scale]
      )
    )
    data.setLineHeights(data.lineHeights.map((l, i) => transformMap[i] ?? 1))
  }

  const line = data.lines[index]

  return (
    <div style={style}>
      {line instanceof Array ? (
        <EventLine events={line} />
      ) : (
        <VerticalLine
          onHover={onHover}
          i={index}
          verticalSize={data.lineHeights[index]}
        />
      )}
    </div>
  )
}

export default TimelineLine
