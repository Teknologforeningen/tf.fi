import DonateForm from '@components/donate/form/DonateForm'
import DonorList from '@components/donate/DonorList'
import FAQ from '@components/donate/FAQ'
import Quote from '@components/donate/Quote'
import { marked } from 'marked'
import Image from 'next/image'
import type { DonatePage } from '@models/donate'

const DonatePage = async ({ donate }: { donate: DonatePage }) => (
  <>
    <h1 className="text-center">{donate.title}</h1>
    <Image
      src="/images/donate.jpg"
      alt="donate"
      width={0}
      height={0}
      sizes="100vw"
      quality={100}
      className="w-full h-auto"
    />
    <div
      dangerouslySetInnerHTML={{
        __html: marked.parse(donate?.summary ?? ''),
      }}
    />
    <DonateForm info={donate.donation_form_info} levels={donate.donation_levels} />
    {donate.quotes?.map((q) => (
      <Quote key={q.author} quote={q} />
    ))}
    {donate.faqs?.map((f) => (
      <FAQ key={f.question} faq={f} />
    ))}
    <DonorList />
  </>
)

export default DonatePage
