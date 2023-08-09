import React from 'react'

const Subtitle = ({ children }: React.PropsWithChildren) => (
  <>
    <p className="text-3xl text-white">{children}</p>
    <div className="my-1 h-[3px] w-full rounded-sm bg-white" />{' '}
  </>
)

export default Subtitle
