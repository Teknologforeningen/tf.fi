import React from 'react'

const PageLayout = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-screen">
    <div className="flex flex-grow justify-center">
      <article className="prose prose-sm xxs:prose-base w-[95vw] 2xl:prose-xl mx-4 mb-12 mt-6 flex flex-col sm:mx-8 md:mx-16 md:mt-12">
        {children}
      </article>
    </div>
  </div>
)

export default PageLayout
