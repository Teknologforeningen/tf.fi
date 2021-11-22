import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { Event } from '../types'
import Link from 'next/link'
import * as marked from 'marked'

interface Props {
  event: Event
}

/** Page for a single event */
const EventPage: NextPage<Props> = ({ event }) => (
  <div className={'event-page-background'}>
    <Link href={'/'}>
      <a className={'homepage-link'}>TILL HEMSIDAN</a>
    </Link>
    <h2 className={'event-page-title'}>{event?.title}</h2>
    <div className={'event-page-content'}>
      <div
        dangerouslySetInnerHTML={{
          __html: marked.parse(event.content ? event.content : ''),
        }}
      />
    </div>
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
