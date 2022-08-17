import classNames from 'classnames'
import { NextPage } from 'next'

interface Props {
  className?: string
}

/** Component for flexbox column */
const Column: NextPage<Props> = ({ className, children }) => (
  <div className={classNames('flex flex-col items-center', className)}>
    {children}
  </div>
)

export default Column
