import Link from 'next/link'

const NotFound = async () => (
  <div className="h-[85vh]">
    <div className="flex flex-grow justify-center items-center h-full">
      <article className="prose prose-sm xxs:prose-base text-center w-[95vw] 2xl:prose-xl px-4 py-16 flex flex-col sm:px-8 md:px-16 md:pt-24">
        <h2>Sidan kunde inte hittas</h2>
        <Link href="/">Tillbaka till hemsidan</Link>
      </article>
    </div>
  </div>
)

export default NotFound
