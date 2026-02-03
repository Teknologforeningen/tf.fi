'use client'

import { useRef } from 'react'

/* eslint-disable @typescript-eslint/no-explicit-any */
export const useDebounce = (func: (...args: any[]) => any, delay: number) => {
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null)
  return function (args: any[]) {
    if (timeout.current !== null) {
      clearTimeout(timeout.current)
    }
    timeout.current = setTimeout(() => {
      func(...args)
      timeout.current = null
    }, delay)
  }
}
