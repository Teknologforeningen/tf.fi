import { useState } from 'react'
import Navbar from './navbar'
import { AvailableLanguages } from '../../utils/languages'
import SideMenu from './navbar/SideMenu'
import MenuIcon from './navbar/MenuIcon'

import { NavbarLink } from '../../lib/api/navbar'

type Props = {
  navbarLinks: NavbarLink[]
  language?: AvailableLanguages
  setLanguage?: (language: AvailableLanguages) => void
}

const Header = ({ navbarLinks, language, setLanguage }: Props) => {
  const [sideMenuOpen, setSideMenuOpen] = useState(false)

  return (
    <header>
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
    </header>
  )
}

export default Header
