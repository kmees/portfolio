import { useEffect, useState } from 'react'

export function useWindowSize() {
  const isClient = typeof window === 'object'

  function getSize() {
    return {
      width: isClient ? Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0) : 0,
      height: isClient ? Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0) : 0
    }
  }

  const [windowSize, setWindowSize] = useState(getSize)

  useEffect(() => {
    if (!isClient) {
      return
    }

    function handleResize() {
      setWindowSize(getSize())
    }

    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, []) // Empty array ensures that effect is only run on mount and unmount

  return windowSize
}