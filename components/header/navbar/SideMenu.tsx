import { ReactNode } from 'react'

type SideMenuProps = {
  open: boolean
  children: ReactNode
}

const SideMenu = ({ open, children }: SideMenuProps) => {
  // TODO: Use framer
  return (
    <div
      className="fixed left-0 top-0 z-10 min-h-screen w-[90vw] overflow-x-hidden bg-darkgray px-8 py-16 duration-[0.4s] descendant:mb-2"
      style={{
        transform: open ? 'translateX(0)' : 'translateX(-100%)',
      }}
    >
      {children}
    </div>
  )
}

export default SideMenu
