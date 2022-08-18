import classNames from 'classnames'
import React from 'react'

type Props = {
  className?: string
}

/** Component for flexbox column */
const Column = ({ className, children }: React.PropsWithChildren<Props>) => (
  <div className={classNames('flex flex-col items-center', className)}>
    {children}
  </div>
)

export default Column
