import { GetServerSideProps, NextPage } from 'next'
import { PageType } from '@models/page'
import { signIn } from 'next-auth/react'
import { useEffect } from 'react'
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
}: PrivatePageProps) => {
  useEffect(() => {
    if (!session) {
      void signIn('keycloak')
    }
  }, [session])

  return <Page {...props} isPrivate={true} />
}

export const getServerSideProps: GetServerSideProps<{
  session: Session | null
}> = async (context) => {
  const query = context.query.privatePage
  const slug = query instanceof Array ? query[0] : query
  const session = await getSession(context)
  const page = session?.user.token
    ? await fetchPrivatePage(session?.user.token, slug)
    : null
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
