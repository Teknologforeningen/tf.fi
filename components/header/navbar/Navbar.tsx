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
  className?: 'navbar' | 'navbar-side'
}

const Navbar: NextPage<Props> = ({
  language,
  setLanguage,
  className = 'navbar',
}) => (
  <nav>
    <Row className={className}>
      <TFLogoSmall />

      {menuValues.map(({ title, link }) => (
        <Link href={link} key={title} passHref>
          <a className="link link-text">
            <span>{texts[language][title]}</span>
          </a>
        </Link>
      ))}

      {className === 'navbar' ? (
        <>
          <Link href={links.täffäab} passHref>
            <a>
              <TaffaABLogo />
            </a>
          </Link>
          <Link href={links.lunch} passHref>
            <a>
              <DagsenLogo />
            </a>
          </Link>
        </>
      ) : (
        <>
          <Row className={'side-menu-icons'}>
            <Link href={links.täffäab} passHref>
              <a>
                <TaffaABLogo />
              </a>
            </Link>
            <Link href={links.lunch} passHref>
              <a>
                <DagsenLogo />
              </a>
            </Link>
          </Row>
          <LanguageOptions
            language={language}
            setLanguage={setLanguage}
            className={'side-menu-languages'}
          />
        </>
      )}
    </Row>
  </nav>
)

export default Navbar
