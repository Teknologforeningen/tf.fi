import { HideableEvent } from '../../types'
import Column from '../Column'
import Link from 'next/link'
import classNames from 'classnames'
import { Textfit } from 'react-textfit'

export type EventBoxProps = {
  event: HideableEvent
  topMargin?: boolean
  [key: string]: unknown
}

const EventBoxTitle = ({
  event,
  topMargin = false,
  ...props
}: EventBoxProps) => (
  <Column
    className={classNames(
      'z-10 p-[7px] text-center text-xl font-extrabold uppercase leading-6 tracking-wide text-darkblue',
      event.type === 'event' ? 'bg-eventblue' : 'bg-blogpink',
      topMargin ? 'mt-4' : ''
    )}
    {...props}
  >
    <Link key={event.id} href={`/${event.slug}`}>
      <a>
        <p className="m-0 text-[10px] font-black leading-[18px]">
          {event.type === 'event' ? 'EVENEMANG' : 'BLOGGINLÄGG'}
        </p>
        <Textfit mode="multi" max={20} className="m-0">
          {event.title}
        </Textfit>
      </a>
    </Link>
  </Column>
)

const EventBoxHorizontalLine = () => (
  <div className="w-full border border-solid border-darkblue" />
)

const EventBoxBody = ({ event, ...props }: EventBoxProps) => (
  <Column
    className="relative mt-4 h-full overflow-y-hidden bg-creamwhite"
    {...props}
  >
    <EventBoxTitle event={event} />
    <EventBoxHorizontalLine />
    <p className="event-box-text my-3 h-1/2 !w-[85%] text-sm font-normal leading-[18px] tracking-wide text-black">
      {event.description}
    </p>
    <Link href={`/${event.slug}`}>
      <a className="absolute bottom-[5px] text-center text-sm font-extrabold leading-[18px] tracking-wide text-black hover:text-[15px] hover:font-semibold">
        LÄS MERA
      </a>
    </Link>
  </Column>
)

type Props = {
  events: HideableEvent[]
}

/** Box where a short description and title of an event can be displayed */
const EventBox = ({ events }: Props) =>
  events.length == 1 ? (
    <EventBoxBody event={events[0]} />
  ) : (
    <>
      {events.map((event, i) => (
        <EventBoxTitle key={i} event={event} topMargin />
      ))}
    </>
  )

export default EventBox
