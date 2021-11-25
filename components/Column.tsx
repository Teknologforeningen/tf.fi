import { NextPage } from 'next'

interface Props {
  center?: boolean
  className?: string
}

/** Component for flexbox column */
const Column: NextPage<Props> = (props) => (
  <div
    className={`column ${props.className}`}
    style={{
      alignItems: props.center ? 'center' : 'start',
    }}
  >
    {props.children}
  </div>
)

export default Column
