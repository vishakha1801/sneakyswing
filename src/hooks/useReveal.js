import { useEffect, useRef } from 'react'

export default function useReveal(threshold = 0.12, rootMargin = '0px 0px -8% 0px') {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('in')
            observer.unobserve(entry.target)
          }
        }
      },
      { threshold, rootMargin }
    )

    // Observe the element itself and any .reveal children
    const revealEls = el.querySelectorAll('.reveal')
    revealEls.forEach((child) => observer.observe(child))
    if (el.classList.contains('reveal')) observer.observe(el)

    return () => observer.disconnect()
  }, [threshold, rootMargin])

  return ref
}
