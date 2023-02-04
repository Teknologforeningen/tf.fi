import React, { useState } from 'react'

export type Namo = {
  id: number
  title: string
  content: string
  date: string
  locale: string
}
type NamoKallelseProps = {
  namokallelses: Namo[]
}

const Namokallelses = ({ namokallelses = [] }: NamoKallelseProps) => {
  const [show, setShow] = useState(true)
  return (
    <div className="sticky left-0 bottom-0 z-10 w-full py-4 px-6 text-gray-700">
      <button
        className="container mx-auto"
        onClick={() => setShow(false)}
        disabled={!show}
      >
        {namokallelses.map((namo) => (
          <div
            key={namo.id}
            className={`my-4 rounded-lg bg-gray-200 p-4 shadow-md transition-all duration-500 ${
              !show && 'transform opacity-0'
            }`}
          >
            <p className="font-medium">{namo.title}</p>
            <p className="text-sm text-gray-600">{namo.content}</p>
          </div>
        ))}
      </button>
    </div>
  )
}

export default Namokallelses
