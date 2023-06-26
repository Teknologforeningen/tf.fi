import classNames from 'classnames'
import React from 'react'

type Props = {
  className?: string
  backgroundColor?: string
}

const Item = ({
  className,
  children,
  backgroundColor,
}: React.PropsWithChildren<Props>) => (
  <div
    className={`flex h-full w-full justify-center`}
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
