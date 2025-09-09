import { type FAQ } from '@models/donate'
import { marked } from 'marked'

const FAQ = ({ faq }: { faq: FAQ }) => (
  <div>
    <h2>{faq.question}</h2>
    <div dangerouslySetInnerHTML={{ __html: marked.parse(faq.answer) }}></div>
  </div>
)

export default FAQ
