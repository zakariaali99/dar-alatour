import { useEffect, useMemo, useRef } from 'react'
import { ArrowDown, MessageCircle } from 'lucide-react'
import { useLang } from '../lib/lang'
import { scrollToId } from '../lib/smooth'
import { gsap, reduceMotion } from '../lib/motion'
import { CONTACT } from '../content'
import Crest from './Crest'

type Mote = {
  left: number
  bottom: number
  size: number
  green: boolean
  rise: number
  drift: number
  duration: number
  delay: number
  peak: number
}

/** Fixed seed, so the drift looks scattered but never re-rolls on a re-render. */
function buildMotes(count: number): Mote[] {
  let seed = 20260408
  const rand = () => {
    seed = (seed * 1664525 + 1013904223) % 4294967296
    return seed / 4294967296
  }

  return Array.from({ length: count }, (_, i) => {
    const size = 3.5 + rand() * 5.5
    return {
      left: 8 + rand() * 84,
      bottom: 4 + rand() * 34,
      size,
      green: rand() > 0.68,
      rise: 210 + rand() * 200,
      drift: (rand() - 0.5) * 90,
      duration: 7 + rand() * 6,
      // Spread the first appearance so they don't all launch together.
      delay: 1.4 + (i / count) * 6 + rand() * 1.6,
      // Smaller motes sit further back, so they burn dimmer.
      peak: 0.55 + (size / 9) * 0.45,
    }
  })
}

export default function Hero() {
  const root = useRef<HTMLElement>(null)
  const stage = useRef<HTMLDivElement>(null)
  const crest = useRef<HTMLDivElement>(null)
  const { t, lang } = useLang()

  const waHref = `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(t.contact.waMessage)}`
  const motes = useMemo(() => buildMotes(20), [])

  useEffect(() => {
    const el = root.current
    if (!el) return

    if (reduceMotion()) {
      gsap.set(el.querySelectorAll('.will-reveal, .word'), { opacity: 1, y: 0 })
      gsap.set([stage.current, '.hero-glow'], { opacity: 1 })
      gsap.set(el.querySelectorAll('.mote'), { opacity: 0 })
      gsap.set(el.querySelectorAll('.swash path'), { strokeDasharray: 'none', strokeDashoffset: 0 })
      return
    }

    const cleanups: Array<() => void> = []

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      tl.fromTo('.hero-eyebrow', { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.9 }, 0.25)
        .fromTo('.word', { yPercent: 118, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 1.15, stagger: 0.075 }, 0.35)
        .fromTo('.hero-body', { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 1 }, 0.85)
        .fromTo('.hero-cta', { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.9, stagger: 0.1 }, 1)
        .fromTo('.hero-marks', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1 }, 1.15)
        .fromTo('.hero-scroll', { opacity: 0 }, { opacity: 1, duration: 0.8 }, 1.4)
        .fromTo(
          crest.current,
          { opacity: 0, scale: 0.68, rotationY: -46, rotationZ: -6, filter: 'blur(18px)' },
          {
            opacity: 1,
            scale: 1,
            rotationY: 0,
            rotationZ: 0,
            filter: 'blur(0px)',
            duration: 2.1,
            ease: 'expo.out',
          },
          0.15,
        )
        .fromTo('.hero-glow', { opacity: 0, scale: 0.7 }, { opacity: 1, scale: 1, duration: 2.2 }, 0.1)
        .fromTo(
          '.swash path',
          { strokeDasharray: 260, strokeDashoffset: 260 },
          { strokeDashoffset: 0, duration: 1.25, ease: 'power2.inOut' },
          1.05,
        )

      // --- Continuous motion -------------------------------------------------
      // The aura turns slowly and breathes; nothing else competes with it.
      gsap.to('.crest-aura', { rotate: 360, duration: 46, ease: 'none', repeat: -1 })
      gsap.to('.crest-aura', {
        scale: 1.13,
        opacity: 0.85,
        duration: 6.5,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      })

      // The crest drifts and breathes.
      gsap.to(crest.current, { y: -13, duration: 5, ease: 'sine.inOut', repeat: -1, yoyo: true, delay: 1.5 })
      gsap.to(crest.current, { scale: 1.022, duration: 7.5, ease: 'sine.inOut', repeat: -1, yoyo: true, delay: 2 })

      // Fragrance: each mote rises once, fades, and starts over on its own clock.
      const moteEls = gsap.utils.toArray<HTMLElement>('.mote')
      moteEls.forEach((node, i) => {
        const m = motes[i]
        if (!m) return

        gsap
          .timeline({ repeat: -1, delay: m.delay })
          .fromTo(
            node,
            { y: 0, x: 0, scale: 0.35 },
            { y: -m.rise, x: m.drift, scale: 1, duration: m.duration, ease: 'none' },
            0,
          )
          .fromTo(
            node,
            { opacity: 0 },
            { opacity: m.peak, duration: m.duration * 0.28, ease: 'power1.out' },
            0,
          )
          .to(node, { opacity: 0, duration: m.duration * 0.46, ease: 'power1.in' }, m.duration * 0.54)
      })

      gsap.to('.orb-a', { x: 60, y: -40, duration: 17, ease: 'sine.inOut', repeat: -1, yoyo: true })
      gsap.to('.orb-b', { x: -50, y: 50, duration: 21, ease: 'sine.inOut', repeat: -1, yoyo: true })

      // --- Pointer tilt -------------------------------------------------------
      const s = stage.current
      if (s && window.matchMedia('(pointer: fine)').matches) {
        const rx = gsap.quickTo(s, 'rotationX', { duration: 0.9, ease: 'power3.out' })
        const ry = gsap.quickTo(s, 'rotationY', { duration: 0.9, ease: 'power3.out' })
        const tx = gsap.quickTo(s, 'x', { duration: 1.1, ease: 'power3.out' })
        const ty = gsap.quickTo(s, 'y', { duration: 1.1, ease: 'power3.out' })

        const onMove = (e: PointerEvent) => {
          const r = s.getBoundingClientRect()
          const px = (e.clientX - (r.left + r.width / 2)) / (r.width / 2)
          const py = (e.clientY - (r.top + r.height / 2)) / (r.height / 2)
          const clamp = (v: number) => Math.max(-1, Math.min(1, v))
          rx(clamp(py) * -10)
          ry(clamp(px) * 13)
          tx(clamp(px) * 16)
          ty(clamp(py) * 13)
        }

        const onLeave = () => {
          rx(0)
          ry(0)
          tx(0)
          ty(0)
        }

        window.addEventListener('pointermove', onMove)
        window.addEventListener('pointerleave', onLeave)
        cleanups.push(() => {
          window.removeEventListener('pointermove', onMove)
          window.removeEventListener('pointerleave', onLeave)
        })
      }
    }, el)

    return () => {
      cleanups.forEach((fn) => fn())
      ctx.revert()
    }
  }, [lang])

  // Scroll parallax lives outside the language-keyed context so it survives toggles.
  useEffect(() => {
    const el = root.current
    if (!el || reduceMotion()) return

    const ctx = gsap.context(() => {
      gsap.to('.hero-copy', {
        y: 70,
        opacity: 0.25,
        ease: 'none',
        scrollTrigger: { trigger: el, start: 'top top', end: 'bottom top', scrub: 0.6 },
      })
      gsap.to('.hero-stage-wrap', {
        y: 110,
        ease: 'none',
        scrollTrigger: { trigger: el, start: 'top top', end: 'bottom top', scrub: 0.6 },
      })
      gsap.to('.hero-scroll', {
        opacity: 0,
        ease: 'none',
        scrollTrigger: { trigger: el, start: 'top top', end: '25% top', scrub: true },
      })
    }, el)

    return () => ctx.revert()
  }, [])

  return (
    <section id="home" ref={root} className="relative flex min-h-[100svh] items-center overflow-hidden pt-28 pb-20 md:pt-32">
      {/* Ambient wash */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-paper via-cream to-cream" />
        <div className="orb-a absolute -top-32 end-[-8%] h-[38rem] w-[38rem] rounded-full bg-[radial-gradient(circle,var(--color-gold-tint)_0%,transparent_68%)] opacity-70 blur-2xl" />
        <div className="orb-b absolute bottom-[-14rem] start-[-10%] h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(circle,var(--color-brand-tint)_0%,transparent_70%)] opacity-60 blur-2xl" />
      </div>

      <div className="container-x grid w-full items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
        {/* Copy */}
        <div className="hero-copy order-2 max-w-2xl lg:order-1">
          <p className="hero-eyebrow will-reveal inline-flex items-center gap-2.5 rounded-full border border-line bg-paper/70 py-1.5 ps-3 pe-4">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-fg" />
            <span className="text-[11px] font-medium tracking-[0.14em] text-ink-soft uppercase rtl:text-[12.5px] rtl:tracking-normal">
              {t.hero.eyebrow}
            </span>
          </p>

          <h1 className="hero-title font-display mt-6 text-ink">
            {t.hero.title.split(' ').map((w, i) => (
              <span key={`${lang}-${i}`} className="inline-block overflow-hidden pb-[0.12em] align-bottom">
                <span className="word inline-block will-change-transform">{w}&nbsp;</span>
              </span>
            ))}

            {/* Closing word carries the accent and a swash that draws itself in */}
            <span className="relative inline-block">
              <span className="inline-block overflow-hidden pb-[0.12em] align-bottom">
                <span className="word inline-block text-brand-fg will-change-transform">
                  {t.hero.titleAccent}
                </span>
              </span>
              <svg
                className="swash pointer-events-none absolute inset-x-0 -bottom-1 w-full text-gold md:-bottom-2"
                viewBox="0 0 200 14"
                preserveAspectRatio="none"
                fill="none"
                aria-hidden
              >
                <path
                  d="M3 9.5C34 3.5 62 11.5 98 6.5C134 1.5 168 10 197 5"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>
            </span>
          </h1>

          <p className="hero-body will-reveal mt-7 max-w-xl text-[1rem] leading-[1.9] text-ink-soft md:text-[1.06rem]">
            {t.hero.body}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <button onClick={() => scrollToId('contact')} className="hero-cta btn btn-primary will-reveal">
              {t.hero.cta}
            </button>
            <a href={waHref} target="_blank" rel="noreferrer" className="hero-cta btn btn-ghost will-reveal">
              <MessageCircle size={16} strokeWidth={1.75} />
              {t.hero.ctaAlt}
            </a>
          </div>

          {/* Factual marks */}
          <dl className="hero-marks will-reveal surface mt-11 grid max-w-lg grid-cols-1 overflow-hidden rounded-sm border border-line bg-paper/60 sm:grid-cols-3">
            {t.marks.map((m, i) => (
              <div
                key={m.k}
                className={`group px-5 py-4 transition-colors duration-500 hover:bg-brand-tint/60 ${
                  i > 0 ? 'border-t border-line sm:border-t-0 sm:border-s' : ''
                }`}
              >
                <dt className="text-[10px] uppercase tracking-[0.16em] text-muted rtl:text-[11px] rtl:tracking-normal">
                  {m.k}
                </dt>
                <dd className="mt-1.5 text-[13px] leading-snug font-medium text-ink">{m.v}</dd>
                <span className="mt-3 block h-px w-6 bg-gold transition-all duration-600 ease-[cubic-bezier(.22,1,.36,1)] group-hover:w-12" />
              </div>
            ))}
          </dl>
        </div>

        {/* Crest */}
        <div className="hero-stage-wrap order-1 flex justify-center lg:order-2 lg:justify-end">
          <div className="relative [perspective:1100px]">
            <div ref={stage} className="relative [transform-style:preserve-3d]">
              {/* A slow wash of gold and green turning behind the mark. The
                  wrapper owns the entrance so it never fights the breathing. */}
              <div className="hero-glow pointer-events-none absolute inset-0 -m-24 sm:-m-28">
                <div className="crest-aura h-full w-full rounded-full opacity-70 blur-3xl" />
              </div>
              <div className="hero-glow pointer-events-none absolute inset-0 -m-16 rounded-full bg-[radial-gradient(circle,var(--color-cream)_0%,color-mix(in_srgb,var(--color-cream)_75%,transparent)_52%,transparent_74%)]" />

              <div ref={crest} className="relative">
                <Crest
                  alt={t.brandFull}
                  className="w-52 max-w-full drop-shadow-[0_24px_50px_rgba(0,0,0,0.14)] sm:w-64 lg:w-[21rem]"
                />
              </div>

              {/* Fragrance drifting up off the crest. Sits above the artwork —
                  behind it the mark's own fill would hide most of them. */}
              <div className="pointer-events-none absolute inset-0 z-10 -m-12">
                {motes.map((m, i) => (
                  <span
                    key={i}
                    className={`mote ${m.green ? 'mote-green' : ''}`}
                    style={{
                      left: `${m.left}%`,
                      bottom: `${m.bottom}%`,
                      width: `${m.size}px`,
                      height: `${m.size}px`,
                      filter: m.size > 5 ? 'blur(1.2px)' : undefined,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <button
        onClick={() => scrollToId('about')}
        className="hero-scroll group absolute bottom-7 start-1/2 flex -translate-x-1/2 flex-col items-center gap-2 rtl:translate-x-1/2"
        aria-label={t.hero.scroll}
      >
        <span className="text-[10px] uppercase tracking-[0.22em] text-muted transition-colors group-hover:text-ink rtl:text-[11px] rtl:tracking-normal">
          {t.hero.scroll}
        </span>
        <ArrowDown size={14} strokeWidth={1.5} className="animate-bounce text-brand-fg [animation-duration:2.4s]" />
      </button>
    </section>
  )
}
