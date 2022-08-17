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
    <div className="grid grid-cols-1 grid-rows-1 w-full max-w-none place-items-center h-[400px] mb-20">
      <div className="absolute h-[400px] w-full max-w-none mt-32 col-span-1 row-span-1">
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
      <Column className="col-span-1 row-span-1 z-10 relative font-semibold leading-5 text-base font-display m-4">
        <p>{texts[language]['fundraising1']}</p>
        <Column className="md:flex-row">
          <p>{texts[language]['fundraising2']}</p>
          <p
            style={{
              textAlign: 'center',
            }}
          >
            <span>
              <Link href={links.fundraising.info} passHref>
                <a className="link link-text !text-sm !text-gold">
                  &nbsp;vision.tf.fi
                </a>
              </Link>
            </span>
          </p>
        </Column>
      </Column>
    </div>
  )
}

export default Fundraising
