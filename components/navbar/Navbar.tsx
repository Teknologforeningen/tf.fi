import React from 'react'
import { NextPage } from 'next'
import Link from 'next/link'
import { useState } from 'react'
import {
  IconButton,
  Box,
  List,
  ListItem,
  Divider,
  SwipeableDrawer,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import Row from '../Row'
import TFLogoSmall from './TFLogoSmall'
import TaffaABLogo from './TaffaABLogo'
import DagsenLogo from './DagsenLogo'
import LanguageOptions from '../languageOptions'
import links from '../../utils/links'
import texts, { Language, AvailableLanguages } from '../../utils/languages'

interface Props {
  isMobile: boolean | undefined
  language: AvailableLanguages
  setLanguage: (language: AvailableLanguages) => void
}

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

const Navbar: NextPage<Props> = ({ isMobile, language, setLanguage }) => {
  const [drawer, setDrawer] = useState(false)
  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return
      }

      setDrawer(open)
    }

  // Generate drawer
  const list = () => (
    <Box
      className={'main-body'}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {menuValues.map(({ title, link }) => (
          <ListItem key={title}>
            <Link href={link} passHref>
              <a className="link link-text">
                <span>{texts[language][title]}</span>
              </a>
            </Link>
          </ListItem>
        ))}
      </List>
      <Divider />
      <Row className={'logos-mobile'}>
        <Link href={links.täffäab} passHref>
          <div>
            <TaffaABLogo />
          </div>
        </Link>
        <Link href={links.lunch} passHref>
          <div>
            <DagsenLogo />
          </div>
        </Link>
      </Row>
      <Divider />
      <List>
        <ListItem>
          <LanguageOptions language={language} setLanguage={setLanguage} />
        </ListItem>
      </List>
    </Box>
  )

  return (
    <>
      {isMobile ? (
        <>
          <Row className={'navbar-mobile'}>
            <IconButton
              size="large"
              edge="start"
              style={{ color: 'white' }}
              aria-label="menu"
              sx={{ mr: 2, ml: 2 }}
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
            <SwipeableDrawer
              open={drawer}
              onClose={toggleDrawer(false)}
              onOpen={toggleDrawer(true)}
            >
              {list()}
            </SwipeableDrawer>
          </Row>
        </>
      ) : (
        <>
          <Row className={'navbar'}>
            <div>
              <TFLogoSmall />
            </div>
            {menuValues.map(({ title, link }) => (
              <Link href={link} passHref key={title}>
                <a className="link link-text">
                  <span>{texts[language][title]}</span>
                </a>
              </Link>
            ))}

            <Link href={links.täffäab} passHref>
              <div>
                <TaffaABLogo />
              </div>
            </Link>
            <Link href={links.lunch} passHref>
              <div>
                <DagsenLogo />
              </div>
            </Link>
          </Row>
        </>
      )}
    </>
  )
}

export default Navbar
