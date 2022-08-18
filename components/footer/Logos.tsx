import Row from '../Row'
import Image from 'next/image'
import Link from 'next/link'

export type NationLogo = {
  name: string
  url: string
  image: {
    url: string
  }
}
type NationImageProps = {
  logo: NationLogo
}

const NationImage = ({ logo }: NationImageProps) => (
  // Tailwind does not work with Next.js images
  <div style={{ position: 'relative', width: '100px', height: '50px' }}>
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

type NationsLogoRowProps = {
  nationLogos: NationLogo[]
}

const NationsLogoRow = ({ nationLogos }: NationsLogoRowProps) => (
  <Row className="my-4 mx-0 w-4/5 flex-wrap justify-around">
    {nationLogos.map((logo, index) => (
      <NationImage logo={logo} key={index} />
    ))}
  </Row>
)

export default NationsLogoRow
