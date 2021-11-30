import { NextPage } from 'next'
import { CSSProperties } from 'react'

interface Props {
  className?: string
  style?: CSSProperties
}

/** Component for flexbox row */
const Row: NextPage<Props> = ({ className, style, children }) => (
  <div
    className={`row ${className}`}
    style={{ justifyContent: 'center', ...style }}
  >
    {children}
  </div>
)

export default Row
