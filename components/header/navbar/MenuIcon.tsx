import { NextPage } from 'next'
import { MouseEventHandler } from 'react'

interface Props {
  open: boolean
  onClick: MouseEventHandler<HTMLDivElement>
}

const MenuIcon: NextPage<Props> = ({ open, onClick }) => (
  <div className={'menu-icon'} onClick={onClick}>
    <div
      className={'menu-icon-bar1'}
      style={{
        transform: open ? 'rotate(-45deg) translate(-9px, 7px)' : 'rotate(0)',
      }}
    />
    <div
      className={'menu-icon-bar2'}
      style={{
        opacity: open ? 0 : 1,
        transform: open ? 'translateX(-100%)' : 'translateX(0)',
      }}
    />
    <div
      className={'menu-icon-bar3'}
      style={{
        transform: open ? 'rotate(45deg) translate(-8px, -7px)' : 'rotate(0)',
      }}
    />
  </div>
)

export default MenuIcon
