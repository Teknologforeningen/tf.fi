import { NextPage } from 'next'
import Link from 'next/link'
import Column from '../Column'
import TFFundraising from './TFFundraising'
import texts, { AvailableLanguages } from '../../utils/languages'
import links from '../../utils/links'
import Row from '../Row'

interface Props {
  language: AvailableLanguages
}

const Fundraising: NextPage<Props> = ({ language }) => {
  return (
    <>
      <TFFundraising />
      <Column className={'fundraising-text'}>
        <p>{texts[language]['fundraising1']}</p>
        <p>{texts[language]['fundraising2']}</p>
        <Row className={'fundraising-links-parent'}>
          <p>
            {texts[language]['fundraising3']}
            <span>
              <Link href={links.fundraising.donera} passHref>
                <a className="link link-text fundraising-link">
                  &nbsp;donera.tf.fi&nbsp;
                </a>
              </Link>
            </span>
          </p>
          <p>
            {texts[language]['fundraising4']}
            <span>
              <Link href={links.fundraising.info} passHref>
                <a className="link link-text fundraising-link">
                  &nbsp;vision.tf.fi
                </a>
              </Link>
            </span>
          </p>
        </Row>
      </Column>
    </>
  )
}

export default Fundraising
