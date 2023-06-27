import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { Event } from '../../models/event'
import Row from '../../components/Row'
import Column from '../../components/Column'
import { marked } from 'marked'
import { fetchEvent, fetchEvents } from '../../lib/api/event'
import { getLayoutProps } from '../../utils/helpers'
import { NationLogo } from '../../components/footer/Logos'
import { NavbarLink } from '../../lib/api/navbar'
import Footer from '../../components/footer/footer'
import Header from '../../components/header'

type Props = {
  event?: Event
  logos: NationLogo[]
  navbarLinks: NavbarLink[]
}

const renderer: marked.RendererObject = {
  image(href: string | null): string {
    return `<img class='event-page-image' src=${href} alt='bild' />`
  },
}

marked.use({ renderer })

/** Page for a single event */
const EventPage: NextPage<Props> = ({
  event,
  logos,
  navbarLinks,
}) => (
  <>
    <Header navbarLinks={navbarLinks} />
    <div className=" z-10 mx-auto my-6 min-h-[92vh] max-w-[95vw] rounded-lg bg-white p-[15px] md:max-w-[55vw] lg:max-w-[80vw]">
      <Column>
        <Row className="w-full">
          <h2 className="text-center text-2xl font-extrabold uppercase leading-7 tracking-wide text-darkblue md:text-4xl">
            {event?.title}
          </h2>
        </Row>

        <div className="mt-12 w-3/4 overflow-hidden text-lg leading-7 tracking-wide">
          <div
            dangerouslySetInnerHTML={{
              __html: marked.parse(event?.content ?? ''),
            }}
          />
        </div>
      </Column>
    </div>
    <Footer logos={logos} />
  </>
)

export const getStaticPaths: GetStaticPaths = async () => {
  // Get all events
  const events = await fetchEvents(1)

  // Create a path for each event background-color: ;
  const paths = events.data.map((event) => ({
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
  const { homepage, logos, navbarLinks } = await getLayoutProps()
  return {
    props: {
      event,
      homepage,
      logos,
      navbarLinks,
    },
  }
}

export default EventPage
