import { NextPage } from 'next'
import { CSSProperties } from 'react'

interface Props {
  className?: string
  style?: CSSProperties
}

/** Component for flexbox column */
const Column: NextPage<Props> = ({ className, style, children }) => (
  <div className={`column ${className ?? ''}`} style={style}>
    {children}
  </div>
)

export default Column
