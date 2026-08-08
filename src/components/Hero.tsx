import { useEffect, useRef } from 'react'
import { ArrowDown, MessageCircle } from 'lucide-react'
import { useLang } from '../lib/lang'
import { scrollToId } from '../lib/smooth'
import { gsap, reduceMotion } from '../lib/motion'
import { CONTACT } from '../content'
import Crest from './Crest'

export default function Hero() {
  const root = useRef<HTMLElement>(null)
  const stage = useRef<HTMLDivElement>(null)
  const crest = useRef<HTMLDivElement>(null)
  const { t, lang } = useLang()

  const waHref = `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(t.contact.waMessage)}`

  useEffect(() => {
    const el = root.current
    if (!el) return

    if (reduceMotion()) {
      gsap.set(el.querySelectorAll('.will-reveal, .word'), { opacity: 1, y: 0 })
      gsap.set([stage.current, '.crest-ring', '.orbit'], { opacity: 1 })
      gsap.set(el.querySelectorAll('.crest-pulse, .crest-spark, .sheen-bar, .crest-glare'), { opacity: 0 })
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
        .fromTo('.crest-ring', { opacity: 0, scale: 0.72 }, { opacity: 1, scale: 1, duration: 1.7, stagger: 0.14 }, 0.5)
        .fromTo('.orbit', { opacity: 0 }, { opacity: 1, duration: 1.2 }, 1.3)

      // --- Continuous motion -------------------------------------------------
      // Rings turn at different speeds and directions.
      gsap.to('.crest-ring-outer', { rotate: 360, duration: 78, ease: 'none', repeat: -1 })
      gsap.to('.crest-ring-mid', { rotate: -360, duration: 54, ease: 'none', repeat: -1 })
      gsap.to('.orbit', { rotate: 360, duration: 22, ease: 'none', repeat: -1 })

      // The crest drifts and breathes.
      gsap.to(crest.current, { y: -13, duration: 5, ease: 'sine.inOut', repeat: -1, yoyo: true, delay: 1.5 })
      gsap.to(crest.current, { scale: 1.022, duration: 7.5, ease: 'sine.inOut', repeat: -1, yoyo: true, delay: 2 })

      // A gold light bar sweeps across the mark, clipped to the artwork's alpha.
      gsap.set('.sheen-bar', { rotation: 16 })
      const sheen = gsap.fromTo(
        '.sheen-bar',
        { xPercent: -280 },
        { xPercent: 460, duration: 1.7, ease: 'power2.inOut', repeat: -1, repeatDelay: 5, delay: 2.1 },
      )

      // Halo rings ping outward from behind the crest.
      gsap.fromTo(
        '.crest-pulse',
        { scale: 0.9, opacity: 0 },
        {
          keyframes: [
            { opacity: 0.5, scale: 1.06, duration: 1.3, ease: 'power2.out' },
            { opacity: 0, scale: 1.52, duration: 3.1, ease: 'power2.out' },
          ],
          repeat: -1,
          repeatDelay: 1.1,
          stagger: 2.3,
          delay: 1.6,
        },
      )

      // Glints catch the light one at a time.
      gsap.set('.crest-spark', { scale: 0, opacity: 0, transformOrigin: '50% 50%' })
      gsap.to('.crest-spark', {
        keyframes: [
          { scale: 1, opacity: 1, rotation: 45, duration: 0.6, ease: 'back.out(2.2)' },
          { scale: 0, opacity: 0, rotation: 95, duration: 0.75, ease: 'power2.in' },
        ],
        repeat: -1,
        repeatDelay: 2.7,
        stagger: { each: 1.15, from: 'random' },
        delay: 2.4,
      })

      // Hovering the crest replays the sweep and lights the glare.
      const glare = el.querySelector<HTMLElement>('.crest-glare')
      gsap.set(glare, { xPercent: -50, yPercent: -50, opacity: 0 })

      const c = crest.current
      if (c) {
        const onEnter = () => {
          sheen.restart(true)
          gsap.to(glare, { opacity: 0.55, duration: 0.45, overwrite: 'auto' })
        }
        const onLeaveCrest = () => gsap.to(glare, { opacity: 0, duration: 0.6, overwrite: 'auto' })
        c.addEventListener('pointerenter', onEnter)
        c.addEventListener('pointerleave', onLeaveCrest)
        cleanups.push(() => {
          c.removeEventListener('pointerenter', onEnter)
          c.removeEventListener('pointerleave', onLeaveCrest)
        })
      }

      gsap.to('.orb-a', { x: 60, y: -40, duration: 17, ease: 'sine.inOut', repeat: -1, yoyo: true })
      gsap.to('.orb-b', { x: -50, y: 50, duration: 21, ease: 'sine.inOut', repeat: -1, yoyo: true })

      // --- Pointer tilt + tracking glare --------------------------------------
      const s = stage.current
      if (s && window.matchMedia('(pointer: fine)').matches) {
        const rx = gsap.quickTo(s, 'rotationX', { duration: 0.9, ease: 'power3.out' })
        const ry = gsap.quickTo(s, 'rotationY', { duration: 0.9, ease: 'power3.out' })
        const tx = gsap.quickTo(s, 'x', { duration: 1.1, ease: 'power3.out' })
        const ty = gsap.quickTo(s, 'y', { duration: 1.1, ease: 'power3.out' })

        // The glare is centred on itself, then follows the pointer inside the
        // crest so the mark catches light wherever the cursor sits.
        const gx = gsap.quickTo(glare, 'x', { duration: 0.6, ease: 'power3.out' })
        const gy = gsap.quickTo(glare, 'y', { duration: 0.6, ease: 'power3.out' })

        const onMove = (e: PointerEvent) => {
          const r = s.getBoundingClientRect()
          const px = (e.clientX - (r.left + r.width / 2)) / (r.width / 2)
          const py = (e.clientY - (r.top + r.height / 2)) / (r.height / 2)
          const clamp = (v: number) => Math.max(-1, Math.min(1, v))
          rx(clamp(py) * -10)
          ry(clamp(px) * 13)
          tx(clamp(px) * 16)
          ty(clamp(py) * 13)

          const cr = crest.current?.getBoundingClientRect()
          if (!cr) return
          gx(e.clientX - cr.left)
          gy(e.clientY - cr.top)
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
              {/* glow */}
              <div className="hero-glow pointer-events-none absolute inset-0 -m-20 rounded-full bg-[radial-gradient(circle,var(--color-paper)_0%,color-mix(in_srgb,var(--color-gold-tint)_60%,transparent)_45%,transparent_72%)]" />
              <div className="hero-glow pointer-events-none absolute inset-0 -m-8 rounded-full bg-[radial-gradient(circle,color-mix(in_srgb,var(--color-brand-fg)_10%,transparent)_0%,transparent_66%)]" />

              {/* rings — class names avoid Tailwind's `ring` utility on purpose */}
              <div className="pointer-events-none absolute inset-0 -m-10 sm:-m-12 lg:-m-14">
                <svg
                  className="crest-ring crest-ring-outer h-full w-full text-gold"
                  viewBox="0 0 200 200"
                  fill="none"
                  aria-hidden
                >
                  <circle
                    cx="100"
                    cy="100"
                    r="99"
                    stroke="currentColor"
                    strokeOpacity="0.5"
                    strokeWidth="0.5"
                    strokeDasharray="1 7"
                    strokeLinecap="round"
                  />
                </svg>
              </div>

              <div className="pointer-events-none absolute inset-0 -m-3 sm:-m-4">
                <svg
                  className="crest-ring crest-ring-mid h-full w-full text-brand-fg"
                  viewBox="0 0 200 200"
                  fill="none"
                  aria-hidden
                >
                  <circle
                    cx="100"
                    cy="100"
                    r="99"
                    stroke="currentColor"
                    strokeOpacity="0.28"
                    strokeWidth="0.7"
                    strokeDasharray="120 260"
                    strokeLinecap="round"
                  />
                  <circle
                    cx="100"
                    cy="100"
                    r="99"
                    stroke="currentColor"
                    strokeOpacity="0.16"
                    strokeWidth="0.7"
                    strokeDasharray="40 320"
                    strokeDashoffset="-190"
                    strokeLinecap="round"
                  />
                </svg>
              </div>

              {/* orbiting mark */}
              <div className="orbit pointer-events-none absolute inset-0 -m-10 sm:-m-12 lg:-m-14">
                <span className="absolute start-1/2 top-0 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-gold shadow-[0_0_12px_2px_color-mix(in_srgb,var(--color-gold)_55%,transparent)] rtl:translate-x-1/2" />
              </div>

              <div ref={crest} className="relative">
                {/* halo pings — behind the mark */}
                <span className="crest-pulse pointer-events-none absolute inset-0 -m-4 rounded-full border border-gold/45" />
                <span className="crest-pulse pointer-events-none absolute inset-0 -m-4 rounded-full border border-gold/45" />

                <div className="relative">
                  <Crest
                    alt={t.brandFull}
                    className="w-52 max-w-full drop-shadow-[0_24px_50px_rgba(0,0,0,0.14)] sm:w-64 lg:w-[21rem]"
                  />

                  {/* light effects, masked to the crest artwork (see .crest-sheen) */}
                  <div className="crest-sheen pointer-events-none absolute inset-0 overflow-hidden">
                    <div
                      className="crest-glare absolute top-0 left-0 h-[60%] w-[60%] rounded-full opacity-0 blur-2xl
                                 bg-[radial-gradient(circle,color-mix(in_srgb,var(--color-gold)_75%,white)_0%,transparent_68%)]"
                    />
                    <div className="sheen-bar absolute -inset-y-1/4 left-0 w-[26%] blur-[2px]" />
                  </div>
                </div>

                {/* glints */}
                {[
                  'top-[6%] left-[12%]',
                  'top-[18%] right-[8%]',
                  'bottom-[14%] left-[6%]',
                  'bottom-[6%] right-[18%]',
                ].map((pos) => (
                  <svg
                    key={pos}
                    className={`crest-spark pointer-events-none absolute ${pos} h-3.5 w-3.5 text-gold`}
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden
                  >
                    <path d="M12 0c.9 8 3.1 11.1 12 12-8.9.9-11.1 4-12 12-.9-8-3.1-11.1-12-12 8.9-.9 11.1-4 12-12Z" />
                  </svg>
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
