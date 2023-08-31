import React, { useState } from 'react'
import Link from 'next/link'
import Row from '@components/Row'
import TFLogoSmall from './TFLogoSmall'
import TaffaABLogo from './TaffaABLogo'
import DagsenLogo from './DagsenLogo'
import links from '@utils/links'
import classNames from 'classnames'
import { NavbarLink, NavbarMultipleLink } from '@lib/api/navbar'
import { useRouter } from 'next/router'
import LoginButton from './LoginButton'

type NavbarProps = {
  navbarLinks: NavbarLink[]
  position?: 'top' | 'side'
  setSideMenuOpen: (state: boolean) => void
}

const Navbar = ({
  navbarLinks,
  setSideMenuOpen,
  position = 'top',
}: NavbarProps) => {
  const router = useRouter()
  const path = router.asPath

  return (
    <nav>
      <div
        className={classNames(
          'flex w-full justify-between px-4 pt-2 md:items-center',
          position === 'side'
            ? 'flex flex-col md:hidden'
            : 'hidden flex-row md:flex'
        )}
      >
        <div className="flex-start flex flex-col justify-between md:flex-row md:items-center">
          <div className="mx-3">
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
              <Link
                key={link.title}
                href={link.link}
                className={classNames(
                  path === link.link && '!text-teknologröd',
                  'link link-text mx-3'
                )}
              >
                {link.title}
              </Link>
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
        <LoginButton className={position === 'side' ? 'mt-6' : ''} />
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
  path: string
  setSideMenuOpen: (state: boolean) => void
}) => {
  const isTop = position === 'top'
  const [open, setOpen] = useState(false)

  const onClick = () => {
    if (!isTop) {
      setOpen(!open)
    }
  }

  return (
    <div className="relative mx-3">
      <div
        className={classNames(
          isTop ? 'peer' : '!m-0',
          path.startsWith(`/${link.basePath}` ?? '') &&
            link.links.find((l) => l.link === path) &&
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
                onClick={() => setSideMenuOpen(false)}
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

export default Navbar
