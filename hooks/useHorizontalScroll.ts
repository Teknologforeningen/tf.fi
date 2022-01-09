import React, { useEffect } from 'react'

export const useHorizontalScroll = () => {
  const elementRef = React.createRef<HTMLDivElement>()

  useEffect(() => {
    const element = elementRef.current
    if (element) {
      const onWheel = (event: WheelEvent) => {
        const isThouchpad =
          Math.abs(event.deltaX) !== 0 || Math.abs(event.deltaY) < 15
        if (isThouchpad) {
          event.stopPropagation()
          return
        }

        element.scrollTo({
          left: element.scrollLeft + event.deltaY * 6,
          behavior: 'smooth',
        })
      }
      element.addEventListener('wheel', onWheel)
      return () => element.removeEventListener('wheel', onWheel)
    }
  }, [])
  return elementRef
}
