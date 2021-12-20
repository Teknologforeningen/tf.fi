import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { Event } from '../types'
import Link from 'next/link'
import LeftAngle from '../components/bottom/eventpage/LeftAngle'
import RightAngle from '../components/bottom/eventpage/RightAngle'
import Row from '../components/Row'
import Column from '../components/Column'
import * as marked from 'marked'

interface Props {
  event?: Event
}

/** Page for a single event */
const EventPage: NextPage<Props> = ({ event }) => (
  <div className={'event-page-background'}>
    <Link href={'/'}>
      <a className={'home-link home-link-text'}>TILL HEMSIDAN</a>
    </Link>
    <Column>
      <Row className={'event-page-global'}>
        <LeftAngle />
        <h2 className={'event-page-title'}>{event?.title}</h2>
        <RightAngle />
      </Row>

      <div className={'event-page-content'}>
        <div
          dangerouslySetInnerHTML={{
            __html: marked.parse(event?.content ?? ''),
          }}
        />
      </div>
    </Column>
  </div>
)

export const getStaticPaths: GetStaticPaths = async () => {
  // Get all events
  const res = await fetch(`${process.env.BACKEND_URL}/events`)
  const events: Event[] = await res.json()

  // Create a path for each event
  const paths = events.map((event) => ({
    params: { slug: event.slug },
  }))

  return {
    paths,
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  // Get a specific event
  const res = await fetch(
    `${process.env.BACKEND_URL}/events?slug=${params?.slug}`
  )
  const data = await res.json()
  // slug is unique field, thus only one can be found
  const event = data[0]
  return {
    props: { event },
  }
}

export default EventPage
