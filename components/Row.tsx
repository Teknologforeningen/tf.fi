import { NextPage } from 'next'
import { CSSProperties } from 'react'
import { UIEventHandler } from 'react'

interface Props {
  className?: string
  style?: CSSProperties
  onScroll?: UIEventHandler
}

/** Component for flexbox row */
const Row: NextPage<Props> = ({ className, style, children, onScroll }) => (
  <div
    className={`row ${className}`}
    style={{ justifyContent: 'center', ...style }}
    onScroll={onScroll}
  >
    {children}
  </div>
)

export default Row
