import { NextPage } from 'next'
import Link from 'next/link'
import Column from '../Column'
import Image from 'next/image'
import texts, { AvailableLanguages } from '../../utils/languages'
import links from '../../utils/links'
import Row from '../Row'

interface Props {
  language: AvailableLanguages
}

const Fundraising: NextPage<Props> = ({ language }) => {
  return (
    <div className={'fundraising-img-parent'}>
      <div className={'fundraising-img'}>
        <Link href={links.fundraising.info} passHref>
          <a>
            <Image
              src={'/images/fundraising_plain.png'}
              alt={'map-overlay'}
              layout={'fill'}
              objectFit={'cover'}
            />
          </a>
        </Link>
      </div>
      <Column className={'fundraising-text'}>
        <p>{texts[language]['fundraising1']}</p>
        <Row className={'fundraising-links-parent'}>
          <p>{texts[language]['fundraising2']}</p>
          <p
            style={{
              textAlign: 'center',
            }}
          >
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
    </div>
  )
}

export default Fundraising
