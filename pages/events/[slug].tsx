import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { Event } from '@models/event'
import { marked } from 'marked'
import { fetchEvent, fetchEvents } from '@lib/api/event'
import { getLayoutProps } from '@utils/helpers'
import { NationLogo } from '@components/footer/Logos'
import { NavbarLink } from '@lib/api/navbar'
import Footer from '@components/footer'
import Header from '@components/header'

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
const EventPage: NextPage<Props> = ({ event, logos, navbarLinks }) => (
  <>
    <Header navbarLinks={navbarLinks} />
    <div className="mx-auto mb-6 mt-14 min-h-[92vh] max-w-[85vw] rounded-lg bg-white p-[15px] xl:mt-6 xl:max-w-screen-lg">
      <article className="prose prose-sm m-8">
        <h1>{event?.title}</h1>
        <div
          dangerouslySetInnerHTML={{
            __html: marked.parse(event?.content ?? ''),
          }}
        />
      </article>
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
