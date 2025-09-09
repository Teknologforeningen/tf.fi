import { FAQs } from '../../../payload-types'
import { JSXConvertersFunction, RichText } from '@payloadcms/richtext-lexical/react'
import { CustomLinkComponent } from './form/DonateForm'
import { DefaultNodeTypes } from '@payloadcms/richtext-lexical'

const jsxConverters: JSXConvertersFunction<DefaultNodeTypes> = ({ defaultConverters }) => ({
  ...defaultConverters,
  link: ({ node }) => <CustomLinkComponent node={node} />,
})

type FAQ = NonNullable<FAQs>[number]

const FAQ = ({ faq }: { faq: FAQ }) => (
  <div>
    <h2>{faq.question}</h2>
    <RichText converters={jsxConverters} data={faq.answer} />
  </div>
)

export default FAQ
