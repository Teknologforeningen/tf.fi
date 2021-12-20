import { useEffect, useRef } from 'react'

export const useHorizontalScroll = () => {
  const elementRef = useRef<Element>()
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
          left: element.scrollLeft + event.deltaY * 2,
          behavior: 'smooth',
        })
      }
      element.addEventListener('wheel', onWheel)
      return () => element.removeEventListener('wheel', onWheel)
    }
  }, [])
  return elementRef
}
