import { NextPage } from 'next'
import Row from '../Row'
import TFLogoSmall from './TFLogoSmall'
import TaffaABLogo from './TaffaABLogo'
import DagsenLogo from './DagsenLogo'

const Navbar: NextPage = () => (
  <Row center className={'navbar'}>
    <div>
      <TFLogoSmall />
    </div>
    <div>OM TEKNOLOGFÖRENINGEN</div>
    <div>MEDLEMSPORTAL</div>
    <div>ABITURIENTER</div>
    <div>STÄLMAR</div>
    <div>FÖR FÖRETAG</div>
    <TaffaABLogo />
    <DagsenLogo />
  </Row>
)

export default Navbar
