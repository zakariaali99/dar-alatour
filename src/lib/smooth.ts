import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap, ScrollTrigger, reduceMotion } from './motion'

let instance: Lenis | null = null

/** Smooth scrolling driven by GSAP's ticker so ScrollTrigger stays in sync. */
export function useSmoothScroll() {
  useEffect(() => {
    if (reduceMotion()) return

    const lenis = new Lenis({ duration: 1.15, smoothWheel: true, touchMultiplier: 1.6 })
    instance = lenis

    if (import.meta.env.DEV) (window as unknown as Record<string, unknown>).__lenis = lenis

    const raf = (time: number) => lenis.raf(time * 1000)
    lenis.on('scroll', ScrollTrigger.update)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(raf)
      lenis.destroy()
      instance = null
    }
  }, [])
}

/** Scrolls a section into view, clearing the fixed header. */
export function scrollToId(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  const offset = window.innerWidth < 768 ? -68 : -84

  if (instance) instance.scrollTo(el, { offset, duration: 1.25 })
  else window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY + offset, behavior: 'smooth' })
}
