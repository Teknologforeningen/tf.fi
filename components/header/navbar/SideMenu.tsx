import { ReactNode } from 'react'
import classNames from 'classnames'

type SideMenuProps = {
  open: boolean
  children: ReactNode
}

const SideMenu = ({ open, children }: SideMenuProps) => (
  <div
    className={classNames(
      open ? 'translate-y-0' : '-translate-y-full',
      'duration-400 fixed left-0 top-0 z-10 h-full w-full overflow-x-hidden bg-darkgray px-4 py-16 transition ease-in-out descendant:mb-2 md:hidden'
    )}
  >
    {children}
  </div>
)

export default SideMenu
