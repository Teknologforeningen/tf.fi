import { NextPage } from 'next'
import Row from '../Row'
import Column from '../Column'
import LanguageOptions from '../languageOptions'

interface Props {
  language: string
}

const Fundraising: NextPage<Props> = ({ language }) => {
  return <div className={'info-parent'}>{language}</div>
}

export default Fundraising
