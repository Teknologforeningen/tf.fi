import { NextPage } from 'next'
import { ReactNode } from 'react'

interface Props {
  open: boolean
  children: ReactNode
}

const SideMenu: NextPage<Props> = (props) => {
  return (
    <div
      className="fixed top-0 left-0 z-10 min-h-screen w-[90vw] overflow-x-hidden bg-darkblue py-16 px-8 shadow-[0_0_200px_rgba(0,0,0,0.9)_inset] duration-[0.4s] descendant:mb-2"
      style={{
        transform: props.open ? 'translateX(0)' : 'translateX(-100%)',
      }}
    >
      {props.children}
    </div>
  )
}

export default SideMenu
