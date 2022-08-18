import React from 'react'

type Props = {
  i: number
  onHover: (i: number) => void
  verticalSize: number
}

const VerticalLine = ({ i, onHover, verticalSize }: Props) => (
  <div onMouseOver={() => onHover(i)} onMouseOut={() => onHover(-10)}>
    <div
      className="my-12  mx-0 h-[33px] w-[1.5px] border-l-[1.5px] border-solid border-gold p-[5px]"
      style={{ transform: `scaleY(${verticalSize})` }}
    />
  </div>
)

export default VerticalLine
