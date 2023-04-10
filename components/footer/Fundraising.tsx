import Link from 'next/link'
import Column from '../Column'
import Image from 'next/image'
import texts, { AvailableLanguages } from '../../utils/languages'
import links from '../../utils/links'

type Props = {
  language: AvailableLanguages
}

const Fundraising = ({ language }: Props) => {
  return (
    <div className="grid h-[400px] w-full max-w-none grid-cols-1 grid-rows-1 place-items-center">
      <div className="absolute col-span-1 row-span-1 h-[400px] w-full max-w-none">
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
      <Column className="relative z-10 col-span-1 row-span-1 m-4 font-display text-base font-semibold leading-5">
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
                <a className="link link-text !text-sm !text-teknologröd">
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
