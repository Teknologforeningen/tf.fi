import { NextPage } from 'next'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import {
  IconButton,
  Box,
  List,
  ListItem,
  Divider,
  SwipeableDrawer,
  Button,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import Row from '../Row'
import TFLogoSmall from './TFLogoSmall'
import TaffaABLogo from './TaffaABLogo'
import DagsenLogo from './DagsenLogo'

interface Props {
  isMobile: Boolean | undefined
}

const menuValues: Array<{ title: string; link: string }> = [
  {
    title: 'OM TEKNOLOGFÖRENINGEN',
    link: 'https://about.teknologforeningen.fi/index.php/',
  },
  {
    title: 'MEDLEMSPORTAL',
    link: 'https://medlem.teknologforeningen.fi/index.php/login-menu-hidden',
  },
  {
    title: 'ABITURIENTER',
    link: 'https://abi.teknologforeningen.fi/index.php/',
  },
  {
    title: 'STÄLMAR',
    link: 'https://stalm.teknologforeningen.fi/index.php/',
  },
  {
    title: 'FÖR FÖRETAG',
    link: 'https://about.teknologforeningen.fi/index.php/?option=com_content&view=article&id=615',
  },
]

const Navbar: NextPage<Props> = ({ isMobile }) => {
  console.log(isMobile)
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
                <span>{title}</span>
              </a>
            </Link>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        <ListItem button>
          <TFLogoSmall />
        </ListItem>
        <ListItem button>
          <TaffaABLogo />
        </ListItem>
        <ListItem button>
          <DagsenLogo />
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
              <Link href={link} passHref>
                <a className="link link-text">
                  <span>{title}</span>
                </a>
              </Link>
            ))}
            <div>
              <TaffaABLogo />
            </div>
            <div>
              <DagsenLogo />
            </div>
          </Row>
        </>
      )}
    </>
  )
}

export default Navbar
