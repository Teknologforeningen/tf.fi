import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { Event } from '../types'
import Link from 'next/link'
import LeftAngle from '../components/eventpage/LeftAngle'
import RightAngle from '../components/eventpage/RightAngle'
import Row from '../components/Row'
import Column from '../components/Column'
import * as marked from 'marked'

interface Props {
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
  <div className="bg-[#ffffe8] my-6 mx-auto min-h-[92vh] p-[15px] max-w-[95vw] md:max-w-[55vw] lg:max-w-[80vw]">
    <Link href={'/'}>
      <a className={'home-link home-link-text'}>TILL HEMSIDAN</a>
    </Link>
    <Column>
      <Row className="w-full">
        <LeftAngle />
        <h2 className="font-extrabold uppercase leading-7 tracking-wide text-darkblue text-center text-2xl md:text-4xl">
          {event?.title}
        </h2>
        <RightAngle />
      </Row>

      <div className="mt-12 tracking-wide leading-7 text-lg w-3/4">
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
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/events`)
  const events: Event[] = await res.json()

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
  // Get a specific event
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/events?slug=${params?.slug}`
  )
  const data = await res.json()
  // slug is a unique field, thus only one can be found
  const event = data[0]
  return {
    props: { event },
    revalidate: 60,
  }
}

export default EventPage
