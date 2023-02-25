import Navbar from './navbar/Navbar'
import { AvailableLanguages } from '../../utils/languages'
import SideMenu from './navbar/SideMenu'
import MenuIcon from './navbar/MenuIcon'
import { useState } from 'react'
import { NavbarLink } from '../../lib/api/navbar'

type Props = {
  navbarLinks: NavbarLink[]
  isHomePage: boolean
  language: AvailableLanguages
}

const Header = ({ navbarLinks, isHomePage, language }: Props) => {
  const [sideMenuOpen, setSideMenuOpen] = useState(false)

  return (
    <header>
      {isHomePage && (
        <>
          <MenuIcon
            open={sideMenuOpen}
            onClick={() => setSideMenuOpen(!sideMenuOpen)}
          />
          <Navbar navbarLinks={navbarLinks} language={language} />
          <SideMenu open={sideMenuOpen}>
            <Navbar
              navbarLinks={navbarLinks}
              language={language}
              position="side"
            />
          </SideMenu>
        </>
      )}
    </header>
  )
}

export default Header
