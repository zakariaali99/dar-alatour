import { MessageCircle } from 'lucide-react'
import { useLang } from '../lib/lang'
import { useReveal } from '../lib/motion'
import { CONTACT } from '../content'

export default function CtaBand() {
  const { t, lang } = useLang()
  const ref = useReveal<HTMLDivElement>({ children: '.rv', stagger: 0.12, y: 26 }, [lang])

  const waHref = `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(t.contact.waMessage)}`

  return (
    <section className="relative overflow-hidden border-t border-line bg-sand">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 start-1/4 h-[24rem] w-[24rem] rounded-full bg-[radial-gradient(circle,var(--color-brand-tint)_0%,transparent_70%)] opacity-70 blur-2xl" />
      </div>

      <div
        ref={ref}
        className="container-x relative flex flex-col items-center gap-8 py-20 text-center md:py-24"
      >
        <span className="rv will-reveal h-px w-10 bg-gold" />

        <h2 className="rv will-reveal max-w-2xl font-display text-[1.9rem] leading-[1.2] font-light tracking-[-0.015em] text-ink sm:text-[2.4rem] md:text-[2.75rem]">
          {t.band.title}
        </h2>

        <p className="rv will-reveal max-w-md text-[0.95rem] leading-[1.8] text-ink-soft">{t.band.body}</p>

        <a href={waHref} target="_blank" rel="noreferrer" className="rv will-reveal btn btn-primary !px-8">
          <MessageCircle size={16} strokeWidth={1.75} />
          {t.band.cta}
        </a>
      </div>
    </section>
  )
}
