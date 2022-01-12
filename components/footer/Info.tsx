import { NextPage } from 'next'
import Column from '../Column'
import LanguageOptions from '../LanguageOptions'
import Fundraising from './Fundraising'
import NationsLogoRow from './Logos'
import { AvailableLanguages } from '../../utils/languages'

interface Props {
  isMobile: boolean | undefined
  language: AvailableLanguages
  setLanguage: (language: AvailableLanguages) => void
}

/*
 TODO:
  - add nationsföretag logos
  - add info about fundraising
*/
const Info: NextPage<Props> = ({ language, setLanguage }) => {
  return (
    <Column className={'fundraising-parent'}>
      <Fundraising language={language} />
      <LanguageOptions language={language} setLanguage={setLanguage} />
      <p className={'info-text'}>TEKNOLOGFÖRENINGENS NATIONSFÖRETAG</p>
      <NationsLogoRow />
    </Column>
  )
}

export default Info
