import classNames from 'classnames'
import { NextPage } from 'next'
import { UIEventHandler } from 'react'

interface Props {
  className?: string
  onScroll?: UIEventHandler
}

/** Component for flexbox row */
const Row: NextPage<Props> = ({ className, children, onScroll }) => (
  <div
    className={classNames('flex', className, 'flex-row justify-center')}
    onScroll={onScroll}
  >
    {children}
  </div>
)

export default Row
