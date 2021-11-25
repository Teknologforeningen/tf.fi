import { NextPage } from 'next'
import Row from '../Row'
import Column from '../Column'

const Info: NextPage = () => {
  return (
    <div className={'info-parent'}>
      <Column center className={'cont'}>
        <Row center className={'info-text'}>
          <div className={'info-text'}>SUOMEKSI</div>
          <div className={'info-text'}>IN ENGLISH</div>
        </Row>
        <Row center className={'info-text'}>
          <div>TEKNOLOGFÖRENINGENS NATIONSFÖRETAG</div>
        </Row>
      </Column>
    </div>
  )
}

export default Info
