import { NextPage } from 'next'
import { AvailableLanguages } from '../../utils/languages'
import Info from './Info'

interface Props {
  isHomePage: boolean
  isMobile: boolean | undefined
  language: AvailableLanguages
  setLanguage: (language: AvailableLanguages) => void
}

const Footer: NextPage<Props> = ({
  isHomePage,
  isMobile,
  language,
  setLanguage,
}) => (
  <footer>
    {isHomePage && (
      <Info isMobile={isMobile} language={language} setLanguage={setLanguage} />
    )}
  </footer>
)

export default Footer
