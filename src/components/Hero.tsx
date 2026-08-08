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
      return
    }

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
          { opacity: 0, scale: 0.84, filter: 'blur(16px)' },
          { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 1.9, ease: 'power2.out' },
          0.15,
        )
        .fromTo('.hero-glow', { opacity: 0, scale: 0.7 }, { opacity: 1, scale: 1, duration: 2.2 }, 0.1)
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

      gsap.to('.orb-a', { x: 60, y: -40, duration: 17, ease: 'sine.inOut', repeat: -1, yoyo: true })
      gsap.to('.orb-b', { x: -50, y: 50, duration: 21, ease: 'sine.inOut', repeat: -1, yoyo: true })

      // --- Pointer tilt ------------------------------------------------------
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
          rx(clamp(py) * -7)
          ry(clamp(px) * 9)
          tx(clamp(px) * 12)
          ty(clamp(py) * 10)
        }

        const onLeave = () => {
          rx(0)
          ry(0)
          tx(0)
          ty(0)
        }

        window.addEventListener('pointermove', onMove)
        window.addEventListener('pointerleave', onLeave)
        return () => {
          window.removeEventListener('pointermove', onMove)
          window.removeEventListener('pointerleave', onLeave)
        }
      }
    }, el)

    return () => ctx.revert()
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
          <p className="hero-eyebrow eyebrow will-reveal">{t.hero.eyebrow}</p>

          <h1 className="mt-6 font-display text-[2.6rem] leading-[1.08] font-light tracking-[-0.02em] text-ink sm:text-6xl lg:text-[4.25rem]">
            {t.hero.title.split(' ').map((w, i) => (
              <span key={`${lang}-${i}`} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
                <span className="word inline-block will-change-transform">{w}&nbsp;</span>
              </span>
            ))}
          </h1>

          <p className="hero-body will-reveal mt-7 max-w-xl text-[0.98rem] leading-[1.85] text-ink-soft md:text-[1.0625rem]">
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
          <dl className="hero-marks will-reveal surface mt-14 grid max-w-lg grid-cols-1 overflow-hidden rounded-sm border border-line bg-paper/60 sm:grid-cols-3">
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
                <Crest
                  alt={t.brandFull}
                  className="w-52 max-w-full drop-shadow-[0_24px_50px_rgba(0,0,0,0.14)] sm:w-64 lg:w-[21rem]"
                />
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
