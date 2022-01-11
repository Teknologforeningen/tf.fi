import { NextPage } from 'next'
import Row from './Row'
import texts, { AvailableLanguages } from '../utils/languages'

interface Props {
  language: AvailableLanguages
  setLanguage: (language: AvailableLanguages) => void
}

const LanguageOptions: NextPage<Props> = ({ language, setLanguage }) => {
  const presentLanguages = Object.keys(texts) as AvailableLanguages[]
  const index = presentLanguages.indexOf(language)
  if (index > -1) {
    presentLanguages.splice(index, 1)
  }
  return (
    <Row className={'language-options'}>
      {presentLanguages.map((lang) => (
        <p
          className="link link-text"
          key={lang}
          onClick={() => {
            setLanguage(lang)
          }}
        >
          {texts[lang]['title']}
        </p>
      ))}
    </Row>
  )
}

export default LanguageOptions
