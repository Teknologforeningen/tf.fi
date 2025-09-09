import { fetchCategory } from '@lib/strapi/category'
import { notFound } from 'next/navigation'
import DonatePage from '@components/donate/DonatePage'

const DoneraPage = async (props: { params: Promise<{ category: string }> }) => {
  const params = await props.params

  const category = await fetchCategory(params.category)
  if (category && category.donation_page) return <DonatePage donate={category.donation_page} />

  notFound()
}

export default DoneraPage
