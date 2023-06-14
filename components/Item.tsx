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
    className={`flex h-[100%] w-[100%] justify-center`}
    style={{ backgroundColor }}
  >
    <div
      className={classNames(
        'flex h-[100%] w-[100%] max-w-6xl py-20 px-5',
        className
      )}
    >
      {children}
    </div>
  </div>
)

export default Item
