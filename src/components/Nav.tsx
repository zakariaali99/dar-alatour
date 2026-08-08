import { useEffect, useState } from 'react'
import { Menu, X, Moon, Sun, Phone, MessageCircle } from 'lucide-react'
import { useLang } from '../lib/lang'
import { useTheme } from '../lib/theme'
import { scrollToId } from '../lib/smooth'
import { gsap } from '../lib/motion'
import { CONTACT } from '../content'
import Crest from './Crest'

const SECTIONS = ['home', 'about', 'services', 'values', 'contact'] as const

export default function Nav() {
  const { t, toggle } = useLang()
  const { isDark, toggle: toggleTheme } = useTheme()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState<string>('home')

  const waHref = `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(t.contact.waMessage)}`

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Highlight whichever section owns the upper third of the viewport.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-20% 0px -70% 0px' },
    )

    SECTIONS.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    gsap.fromTo(
      '[data-nav]',
      { y: -28, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, delay: 0.15, ease: 'power3.out' },
    )
  }, [])

  // Lock the page behind the drawer, and let Escape close it.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  const go = (id: string) => {
    setOpen(false)
    window.setTimeout(() => scrollToId(id), open ? 380 : 0)
  }

  return (
    <>
      <header
        data-nav
        className={`fixed inset-x-0 top-0 z-60 transition-[background-color,box-shadow,backdrop-filter] duration-500 ${
          scrolled ? 'bg-cream/85 shadow-[0_1px_0_0_var(--color-line)] backdrop-blur-xl' : 'bg-transparent'
        }`}
      >
        <nav className="container-x flex h-17 items-center justify-between md:h-21">
          <button onClick={() => go('home')} className="group flex items-center gap-2.5" aria-label={t.brandFull}>
            <Crest className="h-10 w-auto transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-105 md:h-11" />
            <span className="hidden flex-col items-start leading-none sm:flex">
              <span className="font-display text-[17px] leading-tight font-medium text-ink md:text-[19px] rtl:text-[19px] rtl:md:text-[21px]">
                {t.brand}
              </span>
              <span dir="ltr" className="mt-1.5 text-[8.5px] font-medium uppercase tracking-[0.28em] text-muted md:text-[9px]">
                PERFUMES CO.
              </span>
            </span>
          </button>

          <div className="hidden items-center gap-9 lg:flex">
            {SECTIONS.map((id) => (
              <button
                key={id}
                onClick={() => go(id)}
                data-active={active === id}
                className="link-underline text-[13px] font-medium text-ink-soft transition-colors duration-300 hover:text-ink data-[active=true]:text-ink"
              >
                {t.nav[id]}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2.5">
            <button onClick={toggleTheme} className="icon-btn" aria-label={t.ui.theme}>
              {isDark ? <Sun size={16} strokeWidth={1.7} /> : <Moon size={16} strokeWidth={1.7} />}
            </button>

            <button
              onClick={toggle}
              className="icon-btn px-3 text-[11px] font-semibold tracking-wider"
              aria-label={t.ui.language}
            >
              {t.langToggle}
            </button>

            <button onClick={() => go('contact')} className="btn btn-primary hidden !px-5 !py-2.5 !text-[13px] lg:inline-flex">
              {t.nav.contact}
            </button>

            <button
              onClick={() => setOpen(true)}
              className="icon-btn lg:hidden"
              aria-label={t.ui.menu}
              aria-expanded={open}
            >
              <Menu size={17} strokeWidth={1.7} />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile side drawer */}
      <div className={`fixed inset-0 z-65 lg:hidden ${open ? '' : 'pointer-events-none'}`} aria-hidden={!open}>
        <div
          onClick={() => setOpen(false)}
          className={`absolute inset-0 bg-ink/35 backdrop-blur-sm transition-opacity duration-500 ${
            open ? 'opacity-100' : 'opacity-0'
          }`}
        />

        <aside
          className={`absolute inset-y-0 end-0 flex w-[84%] max-w-[21rem] flex-col border-s border-line bg-cream shadow-[0_0_60px_-15px_rgba(0,0,0,0.35)] transition-transform duration-600 ease-[cubic-bezier(.22,1,.36,1)] ${
            open ? 'translate-x-0' : 'translate-x-full rtl:-translate-x-full'
          }`}
        >
          <div className="flex items-center justify-between border-b border-line px-6 py-5">
            <div className="flex items-center gap-3">
              <Crest className="h-10 w-auto" />
              <span className="flex flex-col leading-none">
                <span className="font-display text-[17px] font-medium text-ink rtl:text-[19px]">{t.brand}</span>
                <span dir="ltr" className="mt-1.5 text-[8.5px] font-medium uppercase tracking-[0.28em] text-muted">
                  PERFUMES CO.
                </span>
              </span>
            </div>
            <button onClick={() => setOpen(false)} className="icon-btn" aria-label={t.ui.close}>
              <X size={17} strokeWidth={1.7} />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto px-6 py-4">
            {SECTIONS.map((id, i) => (
              <button
                key={id}
                onClick={() => go(id)}
                data-active={active === id}
                style={{ transitionDelay: open ? `${180 + i * 60}ms` : '0ms' }}
                className={`flex w-full items-center justify-between border-b border-line py-4 text-start transition-all duration-500 ease-[cubic-bezier(.22,1,.36,1)] ${
                  open ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                }`}
              >
                <span
                  className={`font-display text-[1.35rem] transition-colors duration-300 ${
                    active === id ? 'text-brand-fg' : 'text-ink'
                  }`}
                >
                  {t.nav[id]}
                </span>
                <span className="font-display text-[11px] tracking-widest text-muted">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </button>
            ))}
          </nav>

          <div className="border-t border-line px-6 py-5">
            <div className="mb-5 flex items-center justify-between">
              <p className="text-[0.8rem] leading-relaxed text-muted">{t.contact.address}</p>
              <div className="flex shrink-0 items-center gap-2 ps-3">
                <button onClick={toggleTheme} className="icon-btn" aria-label={t.ui.theme}>
                  {isDark ? <Sun size={15} strokeWidth={1.7} /> : <Moon size={15} strokeWidth={1.7} />}
                </button>
                <button
                  onClick={toggle}
                  className="icon-btn px-3 text-[11px] font-semibold tracking-wider"
                  aria-label={t.ui.language}
                >
                  {t.langToggle}
                </button>
              </div>
            </div>

            <a href={waHref} target="_blank" rel="noreferrer" className="btn btn-primary w-full">
              <MessageCircle size={16} strokeWidth={1.75} />
              {t.hero.ctaAlt}
            </a>

            <a
              href={`tel:${CONTACT.phoneTel}`}
              dir="ltr"
              className="mt-4 flex items-center justify-center gap-2 text-[13px] tracking-wide text-ink-soft transition-colors hover:text-ink"
            >
              <Phone size={14} strokeWidth={1.7} />
              {CONTACT.phoneDisplay}
            </a>
          </div>
        </aside>
      </div>
    </>
  )
}
