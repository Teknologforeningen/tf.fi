import Image from 'next/image'
import { Quotes } from '@payload-types'
import { RichText } from '@payloadcms/richtext-lexical/react'

type Quote = NonNullable<Quotes>[number]

const Quote = ({ quote }: { quote: Quote }) => {
  const image = typeof quote.image !== 'number' ? quote.image : undefined
  return (
    <div className="bg-darkgray prose-blockquote:text-white text-white mx-[calc(50%-50vw)] w-screen px-2 lg:px-48 xl:px-96 my-10 flex items-center gap-4 md:gap-10 lg:gap-16">
      <Image
        src={image?.url ?? ''}
        alt={image?.alt ?? ''}
        width={image?.width ?? undefined}
        height={image?.height ?? undefined}
        className="w-44 h-44 object-cover rounded-lg flex-none"
      />
      <div>
        <blockquote>
          <RichText data={quote.content} />
        </blockquote>
        <p className="font-bold sm:text-lg">{quote.author}</p>
      </div>
    </div>
  )
}

export default Quote
