import { NextPage } from 'next'
import Column from '../../Column'
import { EventBoxProps } from './EventBox'
import Link from 'next/link'
import { Textfit } from 'react-textfit'
import classNames from 'classnames'

const EventBoxTitle: NextPage<EventBoxProps> = ({
  event,
  topMargin = false,
  ...props
}) => (
  <Column
    className={classNames(
      'p-[7px] font-extrabold tracking-wide leading-6 text-xl text-center uppercase text-darkblue z-10',
      event.type === 'event' ? 'bg-eventblue' : 'bg-blogpink',
      topMargin ? 'mt-4' : ''
    )}
    {...props}
  >
    <Link key={event.id} href={`/${event.slug}`}>
      <a>
        <p className="m-0 font-black leading-[18px] text-[10px]">
          {event.type === 'event' ? 'EVENEMANG' : 'BLOGGINLÄGG'}
        </p>
        <Textfit mode="multi" max={20} className="m-0">
          {event.title}
        </Textfit>
      </a>
    </Link>
  </Column>
)

export default EventBoxTitle
