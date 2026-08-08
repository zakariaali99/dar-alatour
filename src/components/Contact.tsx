import { MapPin, Phone, MessageCircle, ArrowUpRight } from 'lucide-react'
import { useLang } from '../lib/lang'
import { useReveal } from '../lib/motion'
import { CONTACT } from '../content'
import SectionHead from './SectionHead'
import Crest from './Crest'

export default function Contact() {
  const { t, lang } = useLang()
  const panel = useReveal<HTMLDivElement>({ children: '.rv', stagger: 0.12, y: 28 }, [lang])

  const waHref = `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(t.contact.waMessage)}`

  return (
    <section id="contact" className="relative overflow-hidden border-t border-line py-24 md:py-32">
      <div className="pointer-events-none absolute -start-32 bottom-0 h-[26rem] w-[26rem] rounded-full bg-[radial-gradient(circle,var(--color-gold-tint)_0%,transparent_70%)] opacity-60 blur-2xl" />

      <div className="container-x relative grid gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:gap-20">
        <div>
          <SectionHead eyebrow={t.contact.eyebrow} title={t.contact.title} lead={t.contact.lead} />
        </div>

        <div ref={panel} className="lg:pt-3">
          {/* Details */}
          <div className="rv will-reveal surface relative overflow-hidden rounded-sm border border-line bg-paper">
            {/* crest watermark */}
            <Crest
              aria-hidden
              className="pointer-events-none absolute -bottom-10 -end-8 w-44 opacity-[0.05] select-none"
            />

            <a
              href={`tel:${CONTACT.phoneTel}`}
              className="group relative flex items-center gap-5 border-b border-line p-6 transition-colors duration-500 hover:bg-cream md:p-7"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-sand text-brand-fg transition-all duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:bg-brand group-hover:text-on-brand">
                <Phone size={17} strokeWidth={1.6} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[10px] uppercase tracking-[0.16em] text-muted rtl:text-[11px] rtl:tracking-normal">
                  {t.contact.phoneLabel}
                </span>
                <span dir="ltr" className="mt-1.5 block font-display text-xl tracking-wide text-ink rtl:text-end">
                  {CONTACT.phoneDisplay}
                </span>
              </span>
              <ArrowUpRight
                size={17}
                strokeWidth={1.5}
                className="shrink-0 text-muted transition-all duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:-translate-y-1 group-hover:text-brand-fg rtl:-scale-x-100"
              />
            </a>

            <div className="relative flex items-center gap-5 p-6 md:p-7">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-sand text-brand-fg">
                <MapPin size={17} strokeWidth={1.6} />
              </span>
              <span className="min-w-0">
                <span className="block text-[10px] uppercase tracking-[0.16em] text-muted rtl:text-[11px] rtl:tracking-normal">
                  {t.contact.addressLabel}
                </span>
                <span className="mt-1.5 block text-[0.98rem] leading-relaxed font-medium text-ink">
                  {t.contact.address}
                </span>
              </span>
            </div>
          </div>

          {/* WhatsApp */}
          <a
            href={waHref}
            target="_blank"
            rel="noreferrer"
            className="rv will-reveal group mt-5 flex items-center gap-5 overflow-hidden rounded-sm bg-brand p-6 text-on-brand transition-all duration-600 ease-[cubic-bezier(.22,1,.36,1)] hover:-translate-y-1 hover:bg-brand-deep hover:shadow-[0_26px_50px_-24px_rgba(22,79,68,0.85)] md:p-7"
          >
            <span className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/15">
              <MessageCircle size={19} strokeWidth={1.7} />
              <span className="absolute inset-0 rounded-full bg-white/25 transition-transform duration-1000 group-hover:scale-150 group-hover:opacity-0" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block font-display text-lg leading-snug md:text-xl">{t.contact.waPanelTitle}</span>
              <span className="mt-1 block text-[0.85rem] opacity-80">{t.contact.waPanelBody}</span>
            </span>
            <ArrowUpRight
              size={19}
              strokeWidth={1.5}
              className="shrink-0 transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:translate-x-1 group-hover:-translate-y-1 rtl:-scale-x-100 rtl:group-hover:-translate-x-1"
            />
          </a>
        </div>
      </div>
    </section>
  )
}
