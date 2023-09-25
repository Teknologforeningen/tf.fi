import Column from '../Column'
import NationsLogos from './Logos'
import BasicInfo from './BasicInfo'
import { Homepage } from '../../app/page'

export type FooterProps = Pick<Homepage, 'footer'>

const Footer = async ({ footer }: FooterProps) => (
  <footer>
    <Column className="sticky bottom-0 w-full bg-darkgray py-5">
      <NationsLogos nationLogos={footer?.nationlogos ?? []} />
      <BasicInfo />
    </Column>
  </footer>
)

export default Footer
