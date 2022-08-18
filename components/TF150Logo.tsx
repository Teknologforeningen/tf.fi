import Column from './Column'
import TF150LogoBorder from './TF150LogoUtanText'
import TF150LogoText from './TF150LogoBaraText'

type Props = {
  horizontalPosition: number
}

const TF150Logo = ({ horizontalPosition }: Props) => (
  <Column>
    <div className="relative mt-8 flex h-[250px] w-[250px] justify-center md:h-[450px] md:w-[450px]">
      <TF150LogoBorder degrees={horizontalPosition / 10} />
      <TF150LogoText />
    </div>
  </Column>
)

export default TF150Logo
