import { NextPage } from 'next'
import Navbar from './navbar/Navbar'
import Column from '../Column'
import TF150Logo from '../TF150LogoUtanText'
import TF150LogoText from '../TF150LogoBaraText'
import { AvailableLanguages } from '../../utils/languages'

interface Props {
  isHomePage: boolean
  isMobile: boolean | undefined
  language: AvailableLanguages
  setLanguage: (language: AvailableLanguages) => void
  horizontalPosition: number
}

const Header: NextPage<Props> = ({
  isHomePage,
  isMobile,
  language,
  setLanguage,
  horizontalPosition,
}) => (
  <header>
    {isHomePage && (
      <Navbar
        isMobile={isMobile}
        language={language}
        setLanguage={setLanguage}
      />
    )}
    <Column className="main-logo-container">
      <div className={'main-logo'}>
        <TF150Logo degrees={horizontalPosition / 10} />
        <TF150LogoText />
      </div>
    </Column>
  </header>
)

export default Header
