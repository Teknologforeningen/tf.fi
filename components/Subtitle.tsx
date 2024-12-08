import React from 'react'

const Subtitle = ({
  children,
  underline = true,
}: React.PropsWithChildren<{ underline?: boolean }>) => (
  <>
    <h2 className="text-2xl xxs:text-3xl">{children}</h2>
    {underline && (
      <div className="my-1 h-[3px] w-full rounded-sm bg-teknologröd" />
    )}
  </>
)

export default Subtitle
