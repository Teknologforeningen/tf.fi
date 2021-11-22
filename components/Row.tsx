import { NextPage } from 'next'

interface Props {
  center?: boolean
  className?: string
}

/** Component for flexbox row */
const Row: NextPage<Props> = (props) => (
  <div
    className={'row'}
    style={{ justifyContent: props.center ? 'center' : 'start' }}
  >
    {props.children}
  </div>
)

export default Row
