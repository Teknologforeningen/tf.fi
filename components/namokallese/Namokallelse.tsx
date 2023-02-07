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
    <div
      className={`sticky bottom-0 z-10 mx-auto w-full self-center p-3 text-gray-700 ${
        !show && 'pointer-events-none transform opacity-0'
      }`}
      onClick={() => setShow(false)}
    >
      {namokallelses.map((namo) => (
        <div
          key={namo.id}
          className="my-4 rounded-lg bg-gray-200 p-4 shadow-md transition-all duration-500"
        >
          <p className="select-none font-medium">{namo.title}</p>
          <p className="select-none text-sm text-gray-600">{namo.content}</p>
        </div>
      ))}
    </div>
  )
}

export default Namokallelses
