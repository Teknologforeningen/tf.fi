import { fetchCategory } from '@lib/strapi/category'
import { notFound } from 'next/navigation'
import DonatePage from '@components/donate/DonatePage'
import { getPayload } from 'payload'
import config from '@payload-config'

const DoneraPage = async (props: { params: Promise<{ category: string }> }) => {
  const params = await props.params

  const category = await fetchCategory(params.category)
  if (category && category.donation_page) {
    const payload = await getPayload({ config })
    const donate = await payload.findGlobal({ slug: 'stod-projektet' })
    return <DonatePage donate={donate} />
  }

  notFound()
}

export default DoneraPage
