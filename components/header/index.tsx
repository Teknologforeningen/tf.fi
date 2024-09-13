'use client'

import { useState } from 'react'
import Navbar from './navbar'
import SideMenu from './navbar/SideMenu'
import { NavbarLink } from '@lib/strapi/navbar'
import ExpandableNavbar from './navbar/ExpandableNavbar'

const Header = ({
  navbarLinks,
  sessionToken,
}: {
  navbarLinks: NavbarLink[]
  sessionToken?: string
}) => {
  const [sideMenuOpen, setSideMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-10">
      <div className="bg-darkgray">
        <ExpandableNavbar
          sideMenuOpen={sideMenuOpen}
          setSideMenuOpen={setSideMenuOpen}
        />
        <Navbar
          navbarLinks={navbarLinks}
          setSideMenuOpen={setSideMenuOpen}
          sessionToken={sessionToken}
        />
        <SideMenu open={sideMenuOpen}>
          <Navbar
            navbarLinks={navbarLinks}
            position="side"
            setSideMenuOpen={setSideMenuOpen}
            sessionToken={sessionToken}
          />
        </SideMenu>
      </div>
    </header>
  )
}

export default Header
