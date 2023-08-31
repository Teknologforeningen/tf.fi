import { ReactNode } from 'react'
import { motion } from 'framer-motion'

type SideMenuProps = {
  open: boolean
  children: ReactNode
}

const SideMenu = ({ open, children }: SideMenuProps) => (
  <motion.div
    className="fixed left-0 top-0 z-10 min-h-screen w-full overflow-x-hidden bg-darkgray px-8 py-16 descendant:mb-2 md:hidden"
    initial={false}
    animate={{ transform: open ? 'translateX(0)' : 'translateX(-100%)' }}
    transition={{ duration: 0.4 }}
  >
    {children}
  </motion.div>
)

export default SideMenu
