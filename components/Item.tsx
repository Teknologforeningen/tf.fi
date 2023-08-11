import React from 'react'
import classNames from 'classnames'

type ItemProps = React.PropsWithChildren<{
  className?: string
  backgroundColor?: string
}>

const Item = ({ className, children, backgroundColor }: ItemProps) => (
  <div
    className="flex h-full w-full justify-center"
    style={{ backgroundColor }}
  >
    <div
      className={classNames(
        'flex h-full w-full max-w-6xl justify-center px-5 py-10',
        className
      )}
    >
      {children}
    </div>
  </div>
)

export default Item
