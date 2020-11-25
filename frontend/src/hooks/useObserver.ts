import React from 'react'

export const useObserver = (
  loading: boolean,
  hasNextPage: boolean,
  setPage: (value: React.SetStateAction<number>) => void
) => {
  const observer = React.useRef<IntersectionObserver>()
  const lastPost = React.useCallback(
    (element) => {
      if (loading) return

      if (observer.current) observer.current.disconnect()

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          if (hasNextPage) setPage((page) => page + 1)
        }
      })

      if (element) observer.current.observe(element)
    },
    [loading, hasNextPage, setPage]
  )

  return lastPost
}
