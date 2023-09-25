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
  <div className="relative h-[50px] w-[100px]">
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

type NationsLogosProps = {
  nationLogos: NationLogo[]
}

const NationsLogos = async ({ nationLogos }: NationsLogosProps) => {
  return (
    <Row className="mx-0 my-4 w-4/5 flex-wrap justify-around">
      {nationLogos?.map((logo, index) => (
        <NationImage logo={logo} key={index} />
      ))}
    </Row>
  )
}

export default NationsLogos
