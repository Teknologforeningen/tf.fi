import { NextPage } from 'next'
import { AvailableLanguages } from '../../utils/languages'
import Info from './Info'
import Column from '../Column'

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
    <Column>
      {isHomePage && (
        <Info
          isMobile={isMobile}
          language={language}
          setLanguage={setLanguage}
        />
      )}
    </Column>
  </footer>
)

export default Footer
