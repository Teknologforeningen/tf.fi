import { getPayload } from 'payload'
import config from '@payload-config'
import { RichText } from '@payloadcms/richtext-lexical/react'

const payload = await getPayload({ config })

const DoneraPage = async () => {
  const res = await payload.find({ collection: 'pages' })
  console.log(res.docs[0].content)
  return <RichText data={res.docs[0].content} />
}

export default DoneraPage
