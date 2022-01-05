import { NextPage } from 'next'
import Navbar from './navbar/Navbar'
import Column from '../Column'
import TF150Logo from '../TF150LogoUtanText'
import TF150LogoText from '../TF150LogoBaraText'
import { AvailableLanguages } from '../../utils/languages'

interface Props {
  isHomePage: boolean
  width: number | undefined
  isMobile: boolean | undefined
  language: AvailableLanguages
  setLanguage: (language: AvailableLanguages) => void
  horizontalPosition: number
}

const Header: NextPage<Props> = ({
  isHomePage,
  width,
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
    <Column>
      <div className={'logo'} style={{ position: 'relative' }}>
        <TF150Logo
          width={width}
          isMobile={isMobile}
          degrees={horizontalPosition / 10}
        />
        <TF150LogoText
          width={width}
          isMobile={isMobile}
          style={{ position: 'absolute', top: '39%', left: '24%' }}
        />
      </div>
    </Column>
  </header>
)

export default Header
