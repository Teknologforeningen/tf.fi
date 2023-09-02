import { ReactNode } from 'react'

type SideMenuProps = {
  open: boolean
  children: ReactNode
}

const SideMenu = ({ open, children }: SideMenuProps) => (
  <div
    className={`${
      open ? 'translate-x-0' : '-translate-x-full'
    } duration-400 fixed left-0 top-0 z-10 min-h-screen w-full overflow-x-hidden bg-darkgray px-8 py-16 transition descendant:mb-2 md:hidden`}
  >
    {children}
  </div>
)

export default SideMenu
