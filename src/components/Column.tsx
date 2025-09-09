import classNames from 'classnames'
import React from 'react'

type ColumnProps = React.PropsWithChildren<{ className?: string }>

/** Component for flexbox column */
const Column = ({ className, children }: ColumnProps) => (
  <div className={classNames('flex flex-col items-center', className)}>{children}</div>
)

export default Column
