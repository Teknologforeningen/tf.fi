import classNames from 'classnames'
import React from 'react'

type RowProps = React.PropsWithChildren<{ className?: string }>

/** Component for flexbox row */
const Row = ({ className, children }: React.PropsWithChildren<RowProps>) => (
  <div className={classNames('flex', className, 'flex-row justify-center')}>
    {children}
  </div>
)

export default Row
