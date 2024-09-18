import React, { useState } from 'react'
import Link from 'next/link'
import Row from '@components/Row'
import TFLogoSmall from './TFLogoSmall'
import TaffaABLogo from './TaffaABLogo'
import DagsenLogo from './DagsenLogo'
import links from '@utils/links'
import classNames from 'classnames'
import { NavbarLink, NavbarMultipleLink } from '@lib/strapi/navbar'
import { usePathname } from 'next/navigation'
import LoginButton from './LoginButton'
import HeaderLink from '@components/header/navbar/HeaderLink'
import { MdSearch } from 'react-icons/md'

type NavbarProps = {
  navbarLinks: NavbarLink[]
  position?: 'top' | 'side'
  setSideMenuOpen: (state: boolean) => void
  setSearchOpen: () => void
  sessionToken?: string
}

const Navbar = ({
  navbarLinks,
  setSideMenuOpen,
  position = 'top',
  setSearchOpen,
  sessionToken,
}: NavbarProps) => {
  const path = usePathname()

  return (
    <nav>
      <div
        className={classNames(
          'flex w-full justify-between px-4 py-2 md:items-center',
          position === 'side'
            ? 'flex flex-col md:hidden'
            : 'hidden flex-row md:flex'
        )}
      >
        <div className="flex-start flex flex-col justify-between md:flex-row md:items-center">
          <div className="mx-3 hidden md:block">
            <TFLogoSmall highlight={path === '/'} />
          </div>
          {navbarLinks.map((link) =>
            'links' in link ? (
              <NavbarDropdown
                key={link.title}
                link={link}
                position={position}
                path={path}
                setSideMenuOpen={setSideMenuOpen}
              />
            ) : (
              <HeaderLink
                key={link.title}
                title={link.title}
                href={link.link}
                setSideMenuOpen={setSideMenuOpen}
                className={classNames(
                  path === link.link && '!text-teknologröd',
                  'link link-text mx-3'
                )}
              />
            )
          )}

          {position === 'top' ? (
            <>
              <Link href={links.täffäab} className="link link-text mx-2">
                <TaffaABLogo />
              </Link>
              <Link href={links.lunch} className="link link-text mx-2">
                <DagsenLogo />
              </Link>
            </>
          ) : (
            <>
              <Row className="min-h-[20px] justify-around">
                <Link
                  href={links.täffäab}
                  className="link link-text flex flex-col items-center"
                >
                  <TaffaABLogo />
                  Täffä AB
                </Link>
                <Link
                  href={links.lunch}
                  className="link link-text flex flex-col items-center"
                >
                  <DagsenLogo />
                  Täffä Lunch
                </Link>
              </Row>
              <hr className="mx-auto my-0 w-full text-white" />
            </>
          )}
        </div>

        <Row className={position === 'side' ? 'mt-6' : ''}>
          <button onClick={setSearchOpen} className={position === 'side' ? 'mr-10 mt-1' : ''}>
            <MdSearch color="white" size={32} />
          </button>
          <LoginButton sessionToken={sessionToken} />
        </Row>
      </div>
    </nav>
  )
}

const NavbarDropdown = ({
  link,
  position,
  path,
  setSideMenuOpen,
}: {
  link: NavbarMultipleLink
  position: NavbarProps['position']
  path: string | null
  setSideMenuOpen: (state: boolean) => void
}) => {
  const isTop = position === 'top'
  const [open, setOpen] = useState(false)

  const onClick = () => {
    if (!isTop) {
      setOpen(!open)
    }
  }

  const pathWithoutAnchor = path?.split('#')[0]

  return (
    <div className="relative mx-3">
      <div
        className={classNames(
          isTop ? 'peer' : '!m-0',
          pathWithoutAnchor?.startsWith(`/${link.basePath}`) &&
            link.links.find((l) => l.link === pathWithoutAnchor) &&
            '!text-teknologröd',
          'link-text text-link'
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
            'z-10 bg-darkgray bg-opacity-90 px-1'
          )}
        >
          <div className="!m-0 py-1">
            {link.links.map(({ title, link }) => (
              <HeaderLink
                key={title}
                title={title}
                href={link}
                setSideMenuOpen={setSideMenuOpen}
                className={classNames(
                  isTop && 'py-2',
                  link === pathWithoutAnchor && '!text-teknologröd',
                  'link link-text block'
                )}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Navbar
