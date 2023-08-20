import { GetServerSideProps, NextPage } from 'next'
import { PageType } from '@models/page'
import { marked } from 'marked'
import { signIn } from 'next-auth/react'
import { useEffect } from 'react'
import { Session } from 'next-auth'
import { getSession } from 'next-auth/react'
import { fetchPrivatePage } from '@lib/api/privatepage'
import { NavbarLink } from '@lib/api/navbar'
import { NationLogo } from '@components/footer/Logos'
import { getLayoutProps } from '@utils/helpers'
import Page from '@components/Page'

const renderer: marked.RendererObject = {
  image(href: string | null): string {
    return `<img class='event-page-image' src=${href} alt='bild' />`
  },
}

marked.use({ renderer })

type PrivatePageProps = {
  page: PageType
  logos: NationLogo[]
  navbarLinks: NavbarLink[]
  session: Session
}

const PrivatePage: NextPage<PrivatePageProps> = ({
  session,
  ...props
}: PrivatePageProps) => {
  // TODO: Fix login redirect flow
  useEffect(() => {
    if (!session) {
      void signIn('keycloak')
    }
  }, [session])

  // TODO: Return something meaningful instead.. maybe empty page contents?
  return session ? <Page {...props} /> : <></>
}

export const getServerSideProps: GetServerSideProps<{
  session: Session | null
}> = async (context) => {
  const query = context.query.privatePage
  const slug = query instanceof Array ? query[0] : query
  const session = await getSession(context)
  // TODO: Fix types
  const page = session?.jwt
    ? await fetchPrivatePage(session.jwt, slug)
    : undefined
  const { logos, navbarLinks } = await getLayoutProps()
  return {
    props: {
      page,
      navbarLinks,
      logos,
      session,
    },
  }
}

export default PrivatePage
