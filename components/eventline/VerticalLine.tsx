import { NextPage } from 'next';
import React from 'react';

interface Props {
  i: number
  onHover: (i: number) => void
  verticalSize: number
}

const VerticalLine: NextPage<Props> = ({ i, onHover, verticalSize }) => (
  <div onMouseOver={() => onHover(i)} onMouseOut={() => onHover(-10)}>
    <div className={"vertical-line"} style={{transform: `scaleY(${verticalSize})`}} />
  </div>
   
);

export default VerticalLine;
