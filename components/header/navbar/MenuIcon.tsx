import { MouseEventHandler } from 'react'
import classNames from 'classnames'

type MenuBarProps = {
  className: string
}

const MenuBar = ({ className }: MenuBarProps) => {
  return (
    <div
      className={classNames(
        className,
        'h-[2px] w-[28px] origin-left transform bg-white transition-all duration-[.4s] ease-in-out'
      )}
    />
  )
}

type MenuIconProps = {
  open: boolean
  onClick: MouseEventHandler<HTMLDivElement>
}

const MenuIcon = ({ open, onClick }: MenuIconProps) => (
  <div className="z-50 m-2 p-2 md:hidden" onClick={onClick}>
    <MenuBar
      className={classNames(open ? 'rotate-[42deg]' : 'rotate-0', 'mb-[7px]')}
    />
    <MenuBar
      className={classNames(
        open ? 'translate-x-4 opacity-0' : 'translate-x-0 opacity-100',
        'mb-[7px]'
      )}
    />
    <MenuBar className={open ? '-rotate-[42deg]' : 'rotate-0'} />
  </div>
)

export default MenuIcon
