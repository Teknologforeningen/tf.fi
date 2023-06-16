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
    <>
      {namokallelses.map((namo) => (
        <div
          key={namo.id}
          className={`fixed bottom-[1%] z-10 w-[98%] self-center rounded-lg bg-gray-200 p-4 text-gray-700 shadow-md transition-all duration-500 ${
            !show && 'pointer-events-none transform opacity-0'
          }`}
          onClick={() => setShow(false)}
        >
          <p className="select-none font-medium">{namo.title}</p>
          <p className="select-none text-sm text-gray-600">{namo.content}</p>
        </div>
      ))}
    </>
  )
}

export default Namokallelses
