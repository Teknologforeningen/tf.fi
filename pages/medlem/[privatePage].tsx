import { GetServerSideProps, NextPage } from 'next'
import { PageType } from '@models/page'
import { Session } from 'next-auth'
import { getSession } from 'next-auth/react'
import { fetchPrivatePage } from '@lib/api/privatepage'
import { NavbarLink } from '@lib/api/navbar'
import { NationLogo } from '@components/footer/Logos'
import { getLayoutProps } from '@utils/helpers'
import Page from '@components/Page'

type PrivatePageProps = {
  page: PageType | null
  logos: NationLogo[]
  navbarLinks: NavbarLink[]
  session: Session
}

const PrivatePage: NextPage<PrivatePageProps> = ({
  session,
  ...props
}: PrivatePageProps) => (
  <Page {...props} isPrivate={true} unauthorized={session === null} />
)

export const getServerSideProps: GetServerSideProps<{
  session: Session | null
}> = async (context) => {
  const query = context.query.privatePage
  const slug = query instanceof Array ? query[0] : query
  let session = await getSession(context)
  const page = await fetchPrivatePage(session?.user.token, slug)
  // Reset the session if page fetch failed as it's most likely caused by an invalid session token
  if (page === null) {
    session = null
  }
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
