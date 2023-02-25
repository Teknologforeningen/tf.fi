import Row from './Row'
import texts, { AvailableLanguages } from '../utils/languages'
import classNames from 'classnames'
import Link from 'next/link'

type Props = {
  language: AvailableLanguages
  sideBarMode?: boolean
}

const LanguageOptions = ({ language, sideBarMode = false }: Props) => {
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
        <Link href="/" locale={lang} key={lang}>
          <p className="link link-text">{texts[lang]['title']}</p>
        </Link>
      ))}
    </Row>
  )
}

export default LanguageOptions
