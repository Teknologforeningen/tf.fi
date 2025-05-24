import DonateForm from '@components/donate/form/DonateForm'
import DonorList from '@components/donate/DonorList'
import FAQ from '@components/donate/FAQ'
import Quote from '@components/donate/Quote'
import { marked } from 'marked'
import Image from 'next/image'
import type { DonatePage } from '@models/donate'

const DonatePage = async ({ donate }: { donate: DonatePage }) => (
  <>
    <h1>{donate.title}</h1>
    <div className="relative w-full h-96">
      <Image src="/images/donate.jpg" alt="donate" fill className="object-contain" quality={100} />
    </div>
    <div
      dangerouslySetInnerHTML={{
        __html: marked.parse(donate?.summary ?? ''),
      }}
    />
    <DonateForm />
    {donate.quotes?.map((q) => <Quote key={q.author} quote={q} />)}
    {donate.faqs?.map((f) => <FAQ key={f.question} faq={f} />)}
    <DonorList />
  </>
)

export default DonatePage
