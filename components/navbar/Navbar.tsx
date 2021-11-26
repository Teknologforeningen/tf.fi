import { NextPage } from 'next'
import Row from '../Row'
import Link from 'next/link'
import TFLogoSmall from './TFLogoSmall'
import TaffaABLogo from './TaffaABLogo'
import DagsenLogo from './DagsenLogo'

const Navbar: NextPage = () => (
  <Row center className={'navbar'}>
    <div>
      <TFLogoSmall />
    </div>
    <Link href={'https://about.teknologforeningen.fi/index.php/'} passHref>
      <a className="link link-text">
        <span>OM TEKNOLOGFÖRENINGEN</span>
      </a>
    </Link>
    <Link
      href={'https://medlem.teknologforeningen.fi/index.php/login-menu-hidden'}
      passHref
    >
      <a className="link link-text">
        <span>MEDLEMSPORTAL</span>
      </a>
    </Link>
    <Link href={'https://abi.teknologforeningen.fi/index.php/'} passHref>
      <a className="link link-text">
        <span>ABITURIENTER</span>
      </a>
    </Link>
    <Link href={'https://stalm.teknologforeningen.fi/index.php/'} passHref>
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
  </Row>
)

export default Navbar
