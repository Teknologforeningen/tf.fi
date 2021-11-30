import { NextPage } from 'next'
import Row from '../Row'
import Column from '../Column'
import Link from 'next/link'

const Info: NextPage = () => {
  return (
    <div className={'info-parent'}>
      <Column className={'cont'}>
        <Row className={'info-text'}>
          <Link href={'https://abi.teknologforeningen.fi/index.php/'} passHref>
            <a className="link link-text">
              <span>SUOMEKSI</span>
            </a>
          </Link>
          <Link href={'https://abi.teknologforeningen.fi/index.php/'} passHref>
            <a className="link link-text">
              <span>IN ENGLISH</span>
            </a>
          </Link>
        </Row>
        <Row className={'info-text'}>
          <div>TEKNOLOGFÖRENINGENS NATIONSFÖRETAG</div>
        </Row>
      </Column>
    </div>
  )
}

export default Info
