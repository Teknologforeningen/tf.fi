import { useState } from 'react'
import Navbar from './navbar'
import SideMenu from './navbar/SideMenu'
import MenuIcon from './navbar/MenuIcon'
import { NavbarLink } from '@lib/api/navbar'

const Header = ({ navbarLinks }: { navbarLinks: NavbarLink[] }) => {
  const [sideMenuOpen, setSideMenuOpen] = useState(false)

  return (
    <header>
      <div className="bg-darkgray pb-2">
        <MenuIcon
          open={sideMenuOpen}
          onClick={() => setSideMenuOpen(!sideMenuOpen)}
        />
        <Navbar navbarLinks={navbarLinks} setSideMenuOpen={setSideMenuOpen} />
        <SideMenu open={sideMenuOpen}>
          <Navbar
            navbarLinks={navbarLinks}
            position="side"
            setSideMenuOpen={setSideMenuOpen}
          />
        </SideMenu>
      </div>
    </header>
  )
}

export default Header
