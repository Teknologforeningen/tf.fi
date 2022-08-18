import Row from './Row'
import texts, { AvailableLanguages } from '../utils/languages'
import classNames from 'classnames'

type Props = {
  language: AvailableLanguages
  setLanguage: (language: AvailableLanguages) => void
  sideBarMode?: boolean
}

const LanguageOptions = ({
  language,
  setLanguage,
  sideBarMode = false,
}: Props) => {
  const presentLanguages = Object.keys(texts) as AvailableLanguages[]
  const index = presentLanguages.indexOf(language)
  if (index > -1) {
    presentLanguages.splice(index, 1)
  }
  return (
    <Row
      className={classNames(
        'justify-around',
        sideBarMode
          ? 'mt-4'
          : 'align-center m-4 hidden w-[300px] justify-around font-display text-white md:flex'
      )}
    >
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
