import { NextPage } from 'next'
import Column from '../../Column'

const TaffaABLogo: NextPage = () => (
  <Column>
    <svg
      width={32}
      height={32}
      className="mb-[5px]"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      viewBox="0 0 32 32"
      xmlSpace="preserve"
    >
      <style type="text/css">{'\n\t.st0{fill:#FFFFFF;}\n'}</style>
      <path
        className="st0"
        d="M16,2.39C8.48,2.39,2.39,8.48,2.39,16c0,7.52,6.09,13.61,13.61,13.61c7.52,0,13.61-6.09,13.61-13.61 C29.61,8.48,23.52,2.39,16,2.39z M21.7,24.63c-1.64-0.03-3.49-0.79-3.49-0.79l-1.03-5.06l3.2-2.73l-2.57-6.99l-2.53,0.52l-1.35,0.27 l-2.53,0.51l0.37,7.44l4.02,1.26l1.03,5.07c0,0-1.32,1.35-2.78,2.04c-4.78-0.92-8.4-5.13-8.4-10.17c0-5.71,4.65-10.35,10.35-10.35 S26.35,10.29,26.35,16C26.35,19.6,24.5,22.78,21.7,24.63z"
      />
    </svg>
    <p className="m-0">Täffä AB</p>
  </Column>
)

export default TaffaABLogo
