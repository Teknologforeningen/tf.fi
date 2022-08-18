import Navbar from './navbar/Navbar'
import { AvailableLanguages } from '../../utils/languages'
import SideMenu from './navbar/SideMenu'
import MenuIcon from './navbar/MenuIcon'
import { useState } from 'react'

type Props = {
  isHomePage: boolean
  language: AvailableLanguages
  setLanguage: (language: AvailableLanguages) => void
}

const Header = ({ isHomePage, language, setLanguage }: Props) => {
  const [sideMenuOpen, setSideMenuOpen] = useState(false)

  return (
    <header>
      {isHomePage && (
        <>
          <MenuIcon
            open={sideMenuOpen}
            onClick={() => setSideMenuOpen(!sideMenuOpen)}
          />
          <Navbar language={language} setLanguage={setLanguage} />
          <SideMenu open={sideMenuOpen}>
            <Navbar
              language={language}
              setLanguage={setLanguage}
              position="side"
            />
          </SideMenu>
        </>
      )}
    </header>
  )
}

export default Header
