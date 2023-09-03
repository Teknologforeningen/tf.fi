import { MouseEventHandler } from 'react'

type MenuBarProps = {
  className: string
  opacity?: number
}

const MenuBar = ({ className, opacity = 1 }: MenuBarProps) => {
  return (
    <div
      className={`${className} h-[2px] w-7 origin-left transform bg-white transition-all duration-[.4s] ease-in-out`}
      style={{
        opacity,
      }}
    />
  )
}

type MenuIconProps = {
  open: boolean
  onClick: MouseEventHandler<HTMLDivElement>
}

const MenuIcon = ({ open, onClick }: MenuIconProps) => (
  <div className="z-50 m-2 p-2 md:hidden" onClick={onClick}>
    <MenuBar className={`${open ? 'rotate-[42deg]' : 'rotate-0'} mb-[7px]`} />
    <MenuBar
      opacity={open ? 0 : 1}
      className={`${open ? 'translate-x-full' : 'translate-x-0'} mb-[7px]`}
    />
    <MenuBar className={open ? '-rotate-[42deg]' : 'rotate-0'} />
  </div>
)

export default MenuIcon
