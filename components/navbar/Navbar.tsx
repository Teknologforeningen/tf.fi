import { NextPage } from 'next'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import {
  IconButton,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  SwipeableDrawer,
  Button,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import InboxIcon from '@mui/icons-material/MoveToInbox'
import MailIcon from '@mui/icons-material/Mail'
import Row from '../Row'
import TFLogoSmall from './TFLogoSmall'
import TaffaABLogo from './TaffaABLogo'
import DagsenLogo from './DagsenLogo'

interface Props {
  isMobile: Boolean
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
      sx={{ width: '75%' }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {menuValues.map(({ title, link }) => (
          <ListItem button key={title}>
            <ListItemText primary={title} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </Box>
  )

  return (
    <>
      <Row center className={'navbar'}>
        {isMobile ? (
          <>
            <IconButton
              size="large"
              edge="start"
              style={{ color: 'white' }}
              aria-label="menu"
              sx={{ mr: 2 }}
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
          </>
        ) : (
          <>
            <div>
              <TFLogoSmall />
            </div>
            <Link
              href={'https://about.teknologforeningen.fi/index.php/'}
              passHref
            >
              <a className="link link-text">
                <span>OM TEKNOLOGFÖRENINGEN</span>
              </a>
            </Link>
            <Link
              href={
                'https://medlem.teknologforeningen.fi/index.php/login-menu-hidden'
              }
              passHref
            >
              <a className="link link-text">
                <span>MEDLEMSPORTAL</span>
              </a>
            </Link>
            <Link
              href={'https://abi.teknologforeningen.fi/index.php/'}
              passHref
            >
              <a className="link link-text">
                <span>ABITURIENTER</span>
              </a>
            </Link>
            <Link
              href={'https://stalm.teknologforeningen.fi/index.php/'}
              passHref
            >
              <a className="link link-text">
                <span>STÄLMAR</span>
              </a>
            </Link>
            <Link
              href={
                'https://about.teknologforeningen.fi/index.php/?option=com_content&view=article&id=615'
              }
              passHref
            >
              <a className="link link-text">
                <span>FÖR FÖRETAG</span>
              </a>
            </Link>
            <div>
              <TaffaABLogo />
            </div>
            <div>
              <DagsenLogo />
            </div>
          </>
        )}
      </Row>
    </>
  )
}

export default Navbar
