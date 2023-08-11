import Row from '../Row'
import Image from 'next/image'
import Link from 'next/link'
import { StrapiImage } from '@models/image'

export type NationLogo = {
  id: number
  name: string
  url: string
  image: StrapiImage
}

type NationImageProps = {
  logo: NationLogo
}

const NationImage = ({ logo }: NationImageProps) => (
  // Tailwind does not work with Next.js images
  <div style={{ position: 'relative', width: '100px', height: '50px' }}>
    <Link href={logo.url} passHref>
      <Image
        src={`${process.env.NEXT_PUBLIC_BASE_URL}${logo.image.data.attributes.url}`}
        alt={logo.name}
        className="object-contain"
        fill
      />
    </Link>
  </div>
)

type NationsLogoRowProps = {
  nationLogos: NationLogo[]
}

const NationsLogoRow = ({ nationLogos }: NationsLogoRowProps) => (
  <Row className="mx-0 my-4 w-4/5 flex-wrap justify-around">
    {nationLogos.map((logo, index) => (
      <NationImage logo={logo} key={index} />
    ))}
  </Row>
)

export default NationsLogoRow
