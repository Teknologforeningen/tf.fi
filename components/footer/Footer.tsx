import { NextPage } from 'next'
import { AvailableLanguages } from '../../utils/languages'
import Info from './Info'

interface Props {
  isHomePage: boolean
  language: AvailableLanguages
  setLanguage: (language: AvailableLanguages) => void
}

const Footer: NextPage<Props> = ({ isHomePage, language, setLanguage }) => (
  <footer>
    {isHomePage && <Info language={language} setLanguage={setLanguage} />}
  </footer>
)

export default Footer
