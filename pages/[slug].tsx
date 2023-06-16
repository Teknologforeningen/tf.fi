import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { Event } from '../models/event'
import Link from 'next/link'
import { LeftAngle, RightAngle } from '../components/eventpage/Angles'
import Row from '../components/Row'
import Column from '../components/Column'
import { marked } from 'marked'
import { fetchEvent, fetchEvents } from '../lib/api/event'

type Props = {
  event?: Event
}

const renderer: marked.RendererObject = {
  image(href: string | null): string {
    return `<img class='event-page-image' src=${href} alt='bild' />`
  },
}

marked.use({ renderer })

/** Page for a single event */
const EventPage: NextPage<Props> = ({ event }) => (
  <div className="mx-auto my-6 min-h-[92vh] max-w-[95vw] bg-[#ffffe8] p-[15px] md:max-w-[55vw] lg:max-w-[80vw]">
    <Link href={'/'}>
      <a className="home-link home-link-text">TILL HEMSIDAN</a>
    </Link>
    <Column>
      <Row className="w-full">
        <LeftAngle />
        <h2 className="text-center text-2xl font-extrabold uppercase leading-7 tracking-wide text-darkblue md:text-4xl">
          {event?.title}
        </h2>
        <RightAngle />
      </Row>

      <div className="mt-12 w-3/4 text-lg leading-7 tracking-wide">
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
  const events = await fetchEvents()

  // Create a path for each event background-color: ;
  const paths = events.map((event) => ({
    params: { slug: event.slug },
  }))

  return {
    paths,
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug instanceof Array ? params?.slug[0] : params?.slug
  const event = await fetchEvent(slug)
  return {
    props: { event },
  }
}

export default EventPage
