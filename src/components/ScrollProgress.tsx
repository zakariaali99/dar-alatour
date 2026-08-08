import { useEffect, useRef } from 'react'
import { gsap } from '../lib/motion'

export default function ScrollProgress() {
  const bar = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = bar.current
    if (!el) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: { start: 0, end: 'max', scrub: 0.25 },
        },
      )
    })

    return () => ctx.revert()
  }, [])

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[70] h-[2px]">
      <div
        ref={bar}
        className="h-full w-full origin-[left] bg-gradient-to-r from-brand via-brand to-gold rtl:origin-[right]"
      />
    </div>
  )
}
