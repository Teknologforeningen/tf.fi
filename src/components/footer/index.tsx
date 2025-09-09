import Column from '../Column'
import NationsLogos from './Logos'
import BasicInfo from './BasicInfo'
import { NationLogo } from '@components/footer/Logos'

export type FooterType = {
  nationlogos?: NationLogo[]
}

const Footer = async ({ nationlogos }: FooterType) => (
  <footer>
    <Column className="sticky bottom-0 w-full bg-darkgray py-5">
      <NationsLogos nationLogos={nationlogos ?? []} />
      <BasicInfo />
    </Column>
  </footer>
)

export default Footer
