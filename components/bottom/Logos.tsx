import { NextPage } from 'next'
import Row from '../Row'
import Image from 'next/image'
import Link from 'next/link'
import links from '../../utils/links.json'

const NationsLogoRow: NextPage = () => {
  return (
    <Row className={'logo-row'}>
      <Link href={links.links.nations.thinkCell} passHref>
        <Image
          alt="Think cell"
          src="https://www.teknologforeningen.fi/assets/think-cell-logo_white.png"
          width={100}
          height={23}
        />
      </Link>
      <Link href={links.links.nations.visma} passHref>
        <Image
          alt="Visma"
          src="https://www.teknologforeningen.fi/assets/visma.png"
          width={100}
          height={35}
        />
      </Link>
      <Link href={links.links.nations.accenture} passHref>
        <Image
          alt="Accenture"
          src="https://www.teknologforeningen.fi/assets/accenture.png"
          width={100}
          height={34}
        />
      </Link>
      <Link href={links.links.nations.trimble} passHref>
        <Image
          alt="trimble"
          src="https://www.teknologforeningen.fi/assets/trimble.png"
          width={100}
          height={23}
        />
      </Link>
      <Link href={links.links.nations.futurice} passHref>
        <Image
          alt="futurice"
          src="https://www.teknologforeningen.fi/assets/futurice.png"
          width={100}
          height={49}
        />
      </Link>
      <Link href={links.links.nations.acedemicWork} passHref>
        <Image
          alt="Academic work"
          src="https://www.teknologforeningen.fi/assets/academicwork.png"
          width={100}
          height={31}
        />
      </Link>
    </Row>
  )
}

export default NationsLogoRow
