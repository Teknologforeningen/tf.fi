import { NextPage } from 'next'
import Column from '../../Column'
import Link from 'next/link'
import { EventBoxProps } from './EventBox'
import EventBoxTitle from './EventBoxTitle'
import EventBoxHorizontalLine from './EventBoxHorizontalLine'

const EventBoxBody: NextPage<EventBoxProps> = ({ event, ...props }) => (
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

export default EventBoxBody
