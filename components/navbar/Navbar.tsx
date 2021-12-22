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
import { getKeyValue, languages } from '../../lang/languages'
import LanguageOptions from '../languageOptions'

interface Props {
  isMobile: boolean | undefined
  language: string
  setLanguage: (language: string) => void
}

const menuValues: Array<{ title: string; link: string }> = [
  {
    title: 'om-teknologföreningen',
    link: 'https://about.teknologforeningen.fi/index.php/',
  },
  {
    title: 'medlemsportal',
    link: 'https://medlem.teknologforeningen.fi/index.php/login-menu-hidden',
  },
  {
    title: 'abiturienter',
    link: 'https://abi.teknologforeningen.fi/index.php/',
  },
  {
    title: 'stämlar',
    link: 'https://stalm.teknologforeningen.fi/index.php/',
  },
  {
    title: 'för-företag',
    link: 'https://about.teknologforeningen.fi/index.php/?option=com_content&view=article&id=615',
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
                <span>
                  {getKeyValue(getKeyValue(languages)(language))(title)}
                </span>
              </a>
            </Link>
          </ListItem>
        ))}
      </List>
      <Divider />
      <Row className={'logos-mobile'}>
        <Link href={'https://www.taffa.fi/home'} passHref>
          <div>
            <TaffaABLogo />
          </div>
        </Link>
        <Link
          href={
            'https://about.teknologforeningen.fi/index.php/dagsrestaurangen'
          }
          passHref
        >
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
                  <span>
                    {getKeyValue(getKeyValue(languages)(language))(title)}
                  </span>
                </a>
              </Link>
            ))}

            <Link href={'https://www.taffa.fi/home'} passHref>
              <div>
                <TaffaABLogo />
              </div>
            </Link>
            <Link
              href={
                'https://about.teknologforeningen.fi/index.php/dagsrestaurangen'
              }
              passHref
            >
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
