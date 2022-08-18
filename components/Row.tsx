import classNames from 'classnames'
import React from 'react'

type Props = {
  className?: string
  onScroll?: React.UIEventHandler
}

/** Component for flexbox row */
const Row = ({
  className,
  children,
  onScroll,
}: React.PropsWithChildren<Props>) => (
  <div
    className={classNames('flex', className, 'flex-row justify-center')}
    onScroll={onScroll}
  >
    {children}
  </div>
)

export default Row
