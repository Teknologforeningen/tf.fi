import { NextPage } from 'next'
import Row from '../Row'
import Image from 'next/image'
import Link from 'next/link'

export interface NationLogo {
  name: string
  url: string
  image: {
    url: string
  }
}

interface NationImageProps {
  logo: NationLogo
}

const NationImage: NextPage<NationImageProps> = ({ logo }) => (
  <div className={'logo-container'}>
    <Link href={logo.url} passHref>
      <a>
        <Image
          src={`${process.env.NEXT_PUBLIC_API_URL}${logo.image.url}`}
          alt={logo.name}
          layout={'fill'}
          objectFit={'contain'}
        />
      </a>
    </Link>
  </div>
)

interface NationsLogoRowProps {
  nationLogos: NationLogo[]
}

const NationsLogoRow: NextPage<NationsLogoRowProps> = ({ nationLogos }) => (
  <Row className={'logo-row'}>
    {nationLogos.map((logo, index) => (
      <NationImage logo={logo} key={index} />
    ))}
  </Row>
)

export default NationsLogoRow
