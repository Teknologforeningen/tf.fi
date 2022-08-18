const LeftAngle = () => {
  return (
    <svg
      width={67}
      height={66}
      viewBox="0 0 67 66"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ position: 'relative', top: '20px' }}
    >
      <line y1={58} x2={59} y2={58} stroke="#001627" strokeWidth={2} />
      <line
        x1={1}
        y1={4.37114e-8}
        x2={0.999997}
        y2={59}
        stroke="#001627"
        strokeWidth={2}
      />
      <line x1={8} y1={65} x2={67} y2={65} stroke="#001627" strokeWidth={2} />
      <line x1={9} y1={6} x2={9} y2={65} stroke="#001627" strokeWidth={2} />
    </svg>
  )
}

const RightAngle = () => {
  return (
    <svg
      width={67}
      height={66}
      viewBox="0 0 67 66"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <line
        x1={67}
        y1={8}
        x2={8}
        y2={7.99999}
        stroke="#001627"
        strokeWidth={2}
      />
      <line x1={66} y1={66} x2={66} y2={7} stroke="#001627" strokeWidth={2} />
      <line
        x1={59}
        y1={1}
        x2={-8.74228e-8}
        y2={0.999995}
        stroke="#001627"
        strokeWidth={2}
      />
      <line x1={58} y1={60} x2={58} y2={1} stroke="#001627" strokeWidth={2} />
    </svg>
  )
}

export { LeftAngle, RightAngle }
