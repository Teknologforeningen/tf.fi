import { ReactNode } from 'react'

const CircleWrapper = ({ children }: { children: ReactNode }) => (
  <div className="bg-teknologröd text-white p-2 w-fit h-fit rounded-full flex items-center justify-center justify-self-end">
    {children}
  </div>
)

export default CircleWrapper
