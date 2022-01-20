import { NextPage } from 'next'
import Row from '../Row'
import Image from 'next/image'
import Link from 'next/link'
import links, { Nation } from '../../utils/links'

interface NationImageProps {
  nation: Nation
}

const NationImage: NextPage<NationImageProps> = ({ nation }) => (
  <div className={'logo-container'}>
    <Link href={nation.url} passHref>
      <a>
        <Image
          src={nation.imgUrl}
          alt={nation.name}
          layout={'fill'}
          objectFit={'contain'}
        />
      </a>
    </Link>
  </div>
)

const NationsLogoRow: NextPage = () => (
  <Row className={'logo-row'}>
    {links.nations.map((nation, index) => (
      <NationImage nation={nation} key={index} />
    ))}
  </Row>
)

export default NationsLogoRow
