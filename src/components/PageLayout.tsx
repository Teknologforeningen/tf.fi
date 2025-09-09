import React from 'react'

const PageLayout = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-screen">
    <div className="flex flex-grow justify-center">
      <article className="prose prose-sm xxs:prose-base w-[95vw] 2xl:prose-xl px-4 py-16 flex flex-col sm:px-8 md:px-16 md:pt-24">
        {children}
      </article>
    </div>
  </div>
)

export default PageLayout
