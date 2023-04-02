import { MouseEventHandler } from 'react'

type MenuBarProps = {
  transform: string
  opacity?: number
  backgroundColor?: string
}

const MenuBar = ({
  transform,
  backgroundColor = 'black',
  opacity = 1,
}: MenuBarProps) => {
  return (
    <div
      className='ease-in-out" my-[6px] mx-0 h-[5px] w-[35px] transition duration-[.4s]'
      style={{
        opacity,
        transform,
        backgroundColor,
      }}
    />
  )
}

type Props = {
  open: boolean
  onClick: MouseEventHandler<HTMLDivElement>
}

const MenuIcon = ({ open, onClick }: Props) => (
  <div
    className="fixed top-[10px] left-[10px] z-50 inline-block xl:hidden"
    onClick={onClick}
  >
    <MenuBar
      transform={open ? 'rotate(-45deg) translate(-9px, 7px)' : 'rotate(0)'}
      backgroundColor={open ? 'white' : 'black'}
    />
    <MenuBar
      opacity={open ? 0 : 1}
      transform={open ? 'translateX(-100%)' : 'translateX(0)'}
    />
    <MenuBar
      transform={open ? 'rotate(45deg) translate(-8px, -7px)' : 'rotate(0)'}
      backgroundColor={open ? 'white' : 'black'}
    />
  </div>
)

export default MenuIcon
