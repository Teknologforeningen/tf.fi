import { useState } from 'react'
import Navbar from './navbar'
import SideMenu from './navbar/SideMenu'
import { NavbarLink } from '@lib/api/navbar'
import ExpandableNavbar from './navbar/ExpandableNavbar'

const Header = ({ navbarLinks }: { navbarLinks: NavbarLink[] }) => {
  const [sideMenuOpen, setSideMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-10">
      <div className="bg-darkgray">
        <ExpandableNavbar
          sideMenuOpen={sideMenuOpen}
          setSideMenuOpen={setSideMenuOpen}
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
