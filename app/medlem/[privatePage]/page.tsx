import { getServerSession } from 'next-auth'
import { fetchPrivatePage } from '@lib/strapi/privatepage'
import Page from '@components/Page'
import { authOptions } from '@lib/nextauth'
import Unauthorized from '@components/Unauthorized'

const PrivatePage = async ({ params }: { params: { privatePage: string } }) => {
  const slug = params.privatePage
  const session = await getServerSession(authOptions)
  const page = await fetchPrivatePage(session?.user.token, slug)

  return !session || !session.user || !page ? (
    <Unauthorized />
  ) : (
    <Page page={page} isPrivate />
  )
}

export default PrivatePage
