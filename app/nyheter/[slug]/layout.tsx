import React from 'react'

const NewsLayout = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-screen">
    <div className="flex flex-grow justify-center">
      <div className="prose prose-sm mx-4 mb-12 mt-6 flex flex-col sm:mx-8 md:mx-16 md:mt-12">
        {children}
      </div>
    </div>
  </div>
)

export default NewsLayout
