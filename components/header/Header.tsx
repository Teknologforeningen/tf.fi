import { NextPage } from 'next'
import Navbar from './navbar/Navbar'
import Column from '../Column'
import TF150Logo from '../TF150LogoUtanText'
import TF150LogoText from '../TF150LogoBaraText'
import { AvailableLanguages } from '../../utils/languages'
import SideMenu from './navbar/SideMenu'
import MenuIcon from './navbar/MenuIcon'
import { useState } from 'react'

interface Props {
  isHomePage: boolean
  language: AvailableLanguages
  setLanguage: (language: AvailableLanguages) => void
  horizontalPosition: number
}

const Header: NextPage<Props> = ({
  isHomePage,
  language,
  setLanguage,
  horizontalPosition,
}) => {
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
              className={'navbar-side'}
            />
          </SideMenu>
        </>
      )}
      <Column className="main-logo-container">
        <div className={'main-logo'}>
          <TF150Logo degrees={horizontalPosition / 10} />
          <TF150LogoText />
        </div>
      </Column>
    </header>
  )
}

export default Header
