import { NextPage } from 'next'
import Row from '../Row'
import Column from '../Column'
import Link from 'next/link'

interface Props {
  isMobile: boolean | undefined
}

/*  
 TODO: 
  - add nationsföretag logos
  - add info about fundraising
*/
const Info: NextPage<Props> = ({ isMobile }) => {
  return (
    <div className={'info-parent'}>
      <Column className={'cont'}>
        {!isMobile && (
          <Row className={'info-text'}>
            <Link
              href={'https://abi.teknologforeningen.fi/index.php/'}
              passHref
            >
              <a className="link link-text" style={{ marginRight: '2em' }}>
                <span>SUOMEKSI</span>
              </a>
            </Link>
            <Link
              href={'https://abi.teknologforeningen.fi/index.php/'}
              passHref
            >
              <a className="link link-text">
                <span>IN ENGLISH</span>
              </a>
            </Link>
          </Row>
        )}
        <Row className={'info-text'}>
          <div>TEKNOLOGFÖRENINGENS NATIONSFÖRETAG</div>
        </Row>
      </Column>
    </div>
  )
}

export default Info
