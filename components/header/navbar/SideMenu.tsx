import { NextPage } from 'next'
import { ReactNode } from 'react'

interface Props {
  open: boolean
  children: ReactNode
}

const SideMenu: NextPage<Props> = (props) => {
  return (
    <div
      className="fixed top-0 left-0 w-[90vw] min-h-screen z-10 bg-darkblue shadow-[0_0_200px_rgba(0,0,0,0.9)_inset] py-16 px-8 duration-[0.4s] overflow-x-hidden descendant:mb-2"
      style={{
        transform: props.open ? 'translateX(0)' : 'translateX(-100%)',
      }}
    >
      {props.children}
    </div>
  )
}

export default SideMenu
