import { NextPage } from 'next'
import { ReactNode } from 'react'

interface Props {
  open: boolean
  children: ReactNode
}

const SideMenu: NextPage<Props> = (props) => {
  return (
    <div
      className={'side-menu'}
      style={{
        transform: props.open ? 'translateX(0)' : 'translateX(-100%)',
      }}
    >
      {props.children}
    </div>
  )
}

export default SideMenu
