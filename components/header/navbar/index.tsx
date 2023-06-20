import React, { useState } from 'react'
import Link from 'next/link'
import Row from '../../Row'
import TFLogoSmall from './TFLogoSmall'
import TaffaABLogo from './TaffaABLogo'
import DagsenLogo from './DagsenLogo'
import links from '../../../utils/links'
import { AvailableLanguages } from '../../../utils/languages'
import classNames from 'classnames'
import { NavbarLink, NavbarMultipleLink } from '../../../lib/api/navbar'
import { useRouter } from 'next/router'
import LoginButton from './LoginButton'

type Props = {
  navbarLinks: NavbarLink[]
  language: AvailableLanguages
  setLanguage: (language: AvailableLanguages) => void
  position?: 'top' | 'side'
}

const NavbarDropdown = ({
  link,
  position,
  path,
}: {
  link: NavbarMultipleLink
  position: Props['position']
  path: string
}) => {
  const isTop = position === 'top'
  const [open, setOpen] = useState(false)

  const onClick = () => {
    if (!isTop) {
      setOpen(!open)
    }
  }

  return (
    <div className="relative">
      <div
        className={classNames(
          isTop ? 'peer' : '!m-0',
          path.startsWith(`/${link.basePath}` ?? '') &&
            link.links.find((l) => l.link === path) &&
            '!text-teknologröd',
          'link-text text-lg'
        )}
        onClick={onClick}
      >
        {link.title}
      </div>
      {(isTop || open) && (
        <div
          className={classNames(
            isTop
              ? 'absolute left-0 top-4 mt-2 hidden flex-col rounded-md shadow-lg ring-1 ring-black ring-opacity-5 hover:flex focus:outline-none peer-hover:flex'
              : '!m-0 pl-4',
            'z-10 bg-darkgray bg-opacity-80 px-1'
          )}
        >
          <div className="!m-0 py-1">
            {link.links.map(({ title, link }) => (
              <Link
                key={title}
                href={link}
                className={classNames(
                  isTop && 'py-2',
                  link === path && '!text-teknologröd',
                  'link link-text block'
                )}
              >
                {title}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

const Navbar = ({ navbarLinks, position = 'top' }: Props) => {
  const router = useRouter()
  const path = router.asPath

  return (
    <nav>
      <Row
        className={classNames(
          'justify-evenly pt-2 xl:items-center',
          position === 'side' ? 'flex flex-col xl:hidden' : 'hidden xl:flex'
        )}
      >
        <TFLogoSmall highlight={path === '/'} />

        {navbarLinks.map((link) =>
          'links' in link ? (
            <NavbarDropdown
              key={link.title}
              link={link}
              position={position}
              path={path}
            />
          ) : (
            <Link
              key={link.title}
              href={link.link}
              className={classNames(
                path === link.link && '!text-teknologröd',
                'link link-text'
              )}
            >
              {link.title}
            </Link>
          )
        )}

        {position === 'top' ? (
          <>
            <Link href={links.täffäab} className="link link-text">
              <TaffaABLogo />
            </Link>
            <Link href={links.lunch} className="link link-text">
              <DagsenLogo />
            </Link>
          </>
        ) : (
          <>
            <Row className="min-h-[20px] justify-around">
              <Link href={links.täffäab} className="link link-text">
                <TaffaABLogo />
              </Link>
              <Link href={links.lunch} className="link link-text">
                <DagsenLogo />
              </Link>
            </Row>
            <hr className="mx-auto my-0 w-full text-white" />
            {/*<LanguageOptions
              language={language}
              setLanguage={setLanguage}
              sideBarMode
        />
        //Removed since localization is not implemented yet
        */}
          </>
        )}
        <LoginButton className={position === 'side' ? 'mt-6' : ''} />
      </Row>
    </nav>
  )
}

export default Navbar
