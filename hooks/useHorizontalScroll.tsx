import React, { useEffect } from 'react'

export const useHorizontalScroll = () => {
  const elementRef = React.createRef<HTMLDivElement>()
  useEffect(() => {
    const element = elementRef.current
    if (element) {
      const onWheel = (event: WheelEvent) => {
        if (event.deltaY === 0) return
        if (
          !(element.scrollLeft === 0 && event.deltaY < 0) &&
          !(
            element.scrollWidth -
              element.clientWidth -
              Math.round(element.scrollLeft) ===
              0 && event.deltaY > 0
          )
        ) {
          event.preventDefault()
        }
        element.scrollTo({
          left: element.scrollLeft + event.deltaY * 6,
          behavior: 'smooth',
        })
      }
      element.addEventListener('wheel', onWheel, { passive: true })
      return () => element.removeEventListener('wheel', onWheel)
    }
  }, [])
  return elementRef
}
