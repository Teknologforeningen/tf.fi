import { NextPage } from 'next'
import Link from 'next/link'
import Column from '../Column'
import Row from '../Row'
import TFFundraising from './TFFundraising'
import texts from '../../utils/languages.json'
import links from '../../utils/links.json'

interface Props {
  language: string
}

const Fundraising: NextPage<Props> = ({ language }) => {
  return (
    <div className={'fundraising-parent'}>
      <TFFundraising size={400} />
      <Column className={'fundraising-text'}>
        <p>{texts[language]['fundraising1']}</p>
        <p>{texts[language]['fundraising2']}</p>
        <Row className={'fundraising-text-row'}>
          {' '}
          <p>{texts[language]['fundraising3']}</p>
          <Link href={links.links.fundraising.donera} passHref>
            <a className="link link-text link-fundraising">
              <span>donera.tf.fi</span>
            </a>
          </Link>
          <p>{texts[language]['fundraising4']}</p>
          <Link href={links.links.fundraising.info} passHref>
            <a className="link link-text link-fundraising">
              <span>vision.tf.fi</span>
            </a>
          </Link>
        </Row>
      </Column>
    </div>
  )
}

export default Fundraising
