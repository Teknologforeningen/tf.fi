import React from 'react'

const Subtitle = ({
  children,
  underline = true,
}: React.PropsWithChildren<{ underline?: boolean }>) => (
  <>
    <p className="text-3xl text-black">{children}</p>
    {underline && (
      <div className="my-1 h-[3px] w-full rounded-sm bg-teknologröd" />
    )}
  </>
)

export default Subtitle
