import { useState } from 'react'
import Navbar from './navbar/Navbar'
import { AvailableLanguages } from '../../utils/languages'
import SideMenu from './navbar/SideMenu'
import MenuIcon from './navbar/MenuIcon'

import { NavbarLink } from '../../lib/api/navbar'

type Props = {
  navbarLinks: NavbarLink[]
  isHomePage: boolean
  language: AvailableLanguages
  setLanguage: (language: AvailableLanguages) => void
}

const Header = ({ navbarLinks, isHomePage, language, setLanguage }: Props) => {
  const [sideMenuOpen, setSideMenuOpen] = useState(false)

  return (
    <header>
      {isHomePage && (
        <div className="bg-darkgray pb-2">
          <MenuIcon
            open={sideMenuOpen}
            onClick={() => setSideMenuOpen(!sideMenuOpen)}
          />
          <Navbar
            navbarLinks={navbarLinks}
            language={language}
            setLanguage={setLanguage}
          />
          <SideMenu open={sideMenuOpen}>
            <Navbar
              navbarLinks={navbarLinks}
              language={language}
              setLanguage={setLanguage}
              position="side"
            />
          </SideMenu>
        </div>
      )}
    </header>
  )
}

export default Header
