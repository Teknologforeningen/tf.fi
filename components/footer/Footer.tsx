import Column from '../Column'
import NationsLogoRow, { NationLogo } from './Logos'
import BasicInfo from './BasicInfo'

type Props = {
  logos: NationLogo[]
}
const Footer = ({ logos }: Props) => (
  <footer>
    <Column className="sticky bottom-0 w-full bg-darkgray py-5">
      <NationsLogoRow nationLogos={logos} />
      <BasicInfo />
    </Column>
  </footer>
)

export default Footer
