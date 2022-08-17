import { NextPage } from 'next'
import Column from '../../Column'
import Link from 'next/link'
import { EventBoxProps } from './EventBox'
import EventBoxTitle from './EventBoxTitle'
import EventBoxHorizontalLine from './EventBoxHorizontalLine'

const EventBoxBody: NextPage<EventBoxProps> = ({ event, ...props }) => (
  <Column
    className="h-full bg-creamwhite mt-4 overflow-y-hidden relative"
    {...props}
  >
    <EventBoxTitle event={event} />
    <EventBoxHorizontalLine />
    <p className="event-box-text my-3 !w-[85%] h-1/2 leading-[18px] tracking-wide text-sm font-normal text-black">
      {event.description}
    </p>
    <Link href={`/${event.slug}`}>
      <a className="absolute bottom-[5px] leading-[18px] tracking-wide font-extrabold text-sm text-center text-black hover:font-semibold hover:text-[15px]">
        LÄS MERA
      </a>
    </Link>
  </Column>
)

export default EventBoxBody
