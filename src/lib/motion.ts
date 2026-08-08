import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export const reduceMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

type RevealOpts = {
  /** selector for staggered children; when omitted the element itself animates */
  children?: string
  y?: number
  delay?: number
  duration?: number
  stagger?: number
  start?: string
}

/**
 * Fades content up as it scrolls into view. Re-runs whenever `deps` change so a
 * language switch re-plays the entrance instead of leaving elements invisible.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(
  { children, y = 26, delay = 0, duration = 0.95, stagger = 0.1, start = 'top 85%' }: RevealOpts = {},
  deps: unknown[] = [],
) {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const targets = children ? Array.from(el.querySelectorAll<HTMLElement>(children)) : [el]
    if (!targets.length) return

    if (reduceMotion()) {
      gsap.set(targets, { opacity: 1, y: 0, clearProps: 'all' })
      targets.forEach((t) => t.classList.remove('will-reveal'))
      return
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration,
          delay,
          stagger,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start, once: true },
        },
      )
    }, el)

    return () => ctx.revert()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return ref
}

/** Draws a hairline rule out from its logical start edge. */
export function useRule<T extends HTMLElement = HTMLDivElement>(deps: unknown[] = []) {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (reduceMotion()) {
      gsap.set(el, { scaleX: 1 })
      return
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.3,
          ease: 'power3.inOut',
          scrollTrigger: { trigger: el, start: 'top 90%', once: true },
        },
      )
    }, el)

    return () => ctx.revert()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return ref
}

export { gsap, ScrollTrigger }
