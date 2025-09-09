import DonateForm from '@components/donate/form/DonateForm'
import DonorList from '@components/donate/DonorList'
import FAQ from '@components/donate/FAQ'
import Quote from '@components/donate/Quote'
import Image from 'next/image'
import type { DonatePage } from '@models/donate'
import { JSXConvertersFunction, RichText } from '@payloadcms/richtext-lexical/react'
import { DefaultNodeTypes, SerializedUploadNode } from '@payloadcms/richtext-lexical'
import { StodProjektet } from '../../../payload-types'

const CustomUploadComponent = ({ node }: { node: SerializedUploadNode }) => {
  if (node.relationTo !== 'media') return null

  const uploadDoc = node.value
  if (typeof uploadDoc !== 'object') return null
  const { alt, height, url, width } = uploadDoc
  return <Image src={url ?? ''} alt={alt!} width={width ?? undefined} height={height ?? undefined} />
}

const jsxConverters: JSXConvertersFunction<DefaultNodeTypes> = ({ defaultConverters }) => ({
  ...defaultConverters,
  upload: ({ node }) => <CustomUploadComponent node={node} />,
  heading: (p) => {
    const child = p.node.children[0]
    const textRaw = 'text' in child ? child.text : ''
    const text = typeof textRaw === 'string' ? textRaw : ''

    if (p.node.tag === 'h1') return <h1 className="text-center">{text}</h1>

    return typeof defaultConverters.heading === 'function' ? defaultConverters.heading(p) : null
  },
})

const DonatePage = async ({ donate }: { donate: StodProjektet }) => (
  <>
    {donate.introduction && <RichText converters={jsxConverters} data={donate.introduction} />}
    <DonateForm form={donate.form} />
    {donate.quotes?.map((q) => (
      <Quote key={q.author} quote={q} />
    ))}
    {donate.faqs?.map((f) => (
      <FAQ key={f.question} faq={f} />
    ))}
    <DonorList heading={donate.donationListHeading} />
  </>
)

export default DonatePage
