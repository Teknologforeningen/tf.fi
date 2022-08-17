import React from 'react'
import { NextPage } from 'next'
import Link from 'next/link'
import Row from '../../Row'
import TFLogoSmall from './TFLogoSmall'
import TaffaABLogo from './TaffaABLogo'
import DagsenLogo from './DagsenLogo'
import links from '../../../utils/links'
import texts, { Language, AvailableLanguages } from '../../../utils/languages'
import LanguageOptions from '../../LanguageOptions'
import classNames from 'classnames'

const menuValues: Array<{ title: keyof Language; link: string }> = [
  {
    title: 'om-teknologföreningen',
    link: links['om-teknologföreningen'],
  },
  {
    title: 'medlemsportal',
    link: links.medlemsportal,
  },
  {
    title: 'abiturienter',
    link: links.abiturienter,
  },
  {
    title: 'stälmar',
    link: links.stälmar,
  },
  {
    title: 'för-företag',
    link: links['för-företag'],
  },
]

interface Props {
  language: AvailableLanguages
  setLanguage: (language: AvailableLanguages) => void
  position?: 'top' | 'side'
}

const Navbar: NextPage<Props> = ({
  language,
  setLanguage,
  position = 'top',
}) => (
  <nav>
    <Row
      className={classNames(
        'pt-2 xl:items-center justify-evenly',
        position === 'side' ? 'flex flex-col xl:hidden' : 'hidden xl:flex'
      )}
    >
      <TFLogoSmall />

      {menuValues.map(({ title, link }) => (
        <Link href={link} key={title} passHref>
          <a className="link link-text">
            <span>{texts[language][title]}</span>
          </a>
        </Link>
      ))}

      {position === 'top' ? (
        <>
          <Link href={links.täffäab} passHref>
            <a className={'link link-text'}>
              <TaffaABLogo />
            </a>
          </Link>
          <Link href={links.lunch} passHref>
            <a className={'link link-text'}>
              <DagsenLogo />
            </a>
          </Link>
        </>
      ) : (
        <>
          <Row className="min-h-[20px] justify-around">
            <Link href={links.täffäab} passHref>
              <a className={'link link-text'}>
                <TaffaABLogo />
              </a>
            </Link>
            <Link href={links.lunch} passHref>
              <a className={'link link-text'}>
                <DagsenLogo />
              </a>
            </Link>
          </Row>
          <hr className={'separator'} />
          <LanguageOptions
            language={language}
            setLanguage={setLanguage}
            className="justify-around mt-4"
          />
        </>
      )}
    </Row>
  </nav>
)

export default Navbar
