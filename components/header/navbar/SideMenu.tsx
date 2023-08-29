import { ReactNode } from 'react'
import { motion } from 'framer-motion'

type SideMenuProps = {
  open: boolean
  children: ReactNode
}

const SideMenu = ({ open, children }: SideMenuProps) => {
  // TODO: Use framer
  return (
    <motion.div
      className="fixed left-0 top-0 z-10 min-h-screen w-full overflow-x-hidden bg-darkgray px-8 py-16 duration-[0.4s] descendant:mb-2 sm:w-[450px]"
      style={{
        transform: open ? 'translateX(0)' : 'translateX(-100%)',
      }}
    >
      {children}
    </motion.div>
  )
}

export default SideMenu
