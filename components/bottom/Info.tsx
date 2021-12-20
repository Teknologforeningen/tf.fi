import { NextPage } from 'next'
import Row from '../Row'
import Column from '../Column'
import { languages, getKeyValue } from '../../lang/languages'

interface Props {
  isMobile: boolean | undefined
  language: string
  setLanguage: (language: string) => void
}

/*  
 TODO: 
  - add nationsföretag logos
  - add info about fundraising
*/
const Info: NextPage<Props> = ({ isMobile, language, setLanguage }) => {
  const presentLanguages = [...Object.keys(languages)]
  const index = presentLanguages.indexOf(language)
  if (index > -1) {
    presentLanguages.splice(index, 1)
  }
  return (
    <div className={'info-parent'}>
      <Column className={'cont'}>
        {!isMobile && (
          <Row className={'info-text'}>
            {presentLanguages.map((lang) => (
              <div
                className="link link-text"
                style={{ marginRight: '2em' }}
                key={lang}
                onClick={() => {
                  setLanguage(lang)
                }}
              >
                <span>
                  {getKeyValue(getKeyValue(languages)(lang))('title')}
                </span>
              </div>
            ))}
          </Row>
        )}
        <Row className={'info-text'}>
          <div>TEKNOLOGFÖRENINGENS NATIONSFÖRETAG</div>
        </Row>
      </Column>
    </div>
  )
}

export default Info
