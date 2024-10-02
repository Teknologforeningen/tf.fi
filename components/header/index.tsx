'use client'

import { useState } from 'react'
import Navbar from './navbar'
import SideMenu from './navbar/SideMenu'
import { NavbarLink } from '@lib/strapi/navbar'
import ExpandableNavbar from './navbar/ExpandableNavbar'
import SearchOverlay from './navbar/searchpage'

const Header = ({
  navbarLinks,
  sessionToken,
}: {
  navbarLinks: NavbarLink[]
  sessionToken?: string
}) => {
  const [sideMenuOpen, setSideMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)

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
          openSearch={() => setSearchOpen(true)}
          sessionToken={sessionToken}
        />
        <SideMenu open={sideMenuOpen}>
          <Navbar
            navbarLinks={navbarLinks}
            position="side"
            setSideMenuOpen={setSideMenuOpen}
            openSearch={() => setSearchOpen(true)}
            sessionToken={sessionToken}
          />
        </SideMenu>
      </div>
      {searchOpen && (
        <SearchOverlay
          sessionToken={sessionToken}
          setSideMenuOpen={setSideMenuOpen}
          onClose={() => setSearchOpen(false)}
        />
      )}
    </header>
  )
}

export default Header
