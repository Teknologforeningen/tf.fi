import { type Quote } from '@models/donate'
import Image from 'next/image'

const Quote = ({ quote }: { quote: Quote }) => (
  <div className="bg-darkgray prose-blockquote:text-white text-white mx-[calc(50%-50vw)] w-screen px-48 xl:px-96 my-10 flex items-center gap-16">
    <Image
      src={`${process.env.NEXT_PUBLIC_BASE_URL}${quote.picture.url}`}
      alt={quote.picture.alternativeText}
      width={180}
      height={180}
      className="w-44 h-44 object-cover rounded-lg flex-none"
    />
    <div>
      <blockquote>
        <p>{quote.content}</p>
      </blockquote>
      <p className="font-bold text-lg">{quote.author}</p>
    </div>
  </div>
)

export default Quote
