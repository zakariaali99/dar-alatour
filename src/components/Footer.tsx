import { ArrowUp, Phone, MapPin } from 'lucide-react'
import { useLang } from '../lib/lang'
import { scrollToId } from '../lib/smooth'
import { CONTACT } from '../content'
import Crest from './Crest'

const SECTIONS = ['home', 'about', 'services', 'values', 'contact'] as const

export default function Footer() {
  const { t } = useLang()
  const year = new Date().getFullYear()

  return (
    <footer className="relative overflow-hidden border-t border-line bg-paper">
      <div className="container-x relative grid gap-12 py-16 md:grid-cols-[1.6fr_1fr_1.2fr] md:gap-12 md:py-20">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-3">
            <Crest className="h-13 w-auto" />
            <div className="leading-none">
              <p className="font-display text-xl font-medium text-ink rtl:text-[22px]">{t.brand}</p>
              <p dir="ltr" className="mt-1.5 text-[9px] font-medium uppercase tracking-[0.28em] text-muted">
                PERFUMES CO.
              </p>
            </div>
          </div>

          <p className="mt-6 max-w-xs text-[0.875rem] leading-[1.85] text-ink-soft">{t.footer.tagline}</p>

          <span className="mt-7 block h-px w-12 bg-gold" />
        </div>

        {/* Nav */}
        <div>
          <p className="eyebrow">{t.footer.nav}</p>
          <ul className="mt-6 space-y-3.5">
            {SECTIONS.map((id) => (
              <li key={id}>
                <button
                  onClick={() => scrollToId(id)}
                  className="link-underline text-[0.875rem] text-ink-soft transition-colors duration-300 hover:text-ink"
                >
                  {t.nav[id]}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <p className="eyebrow">{t.footer.reach}</p>
          <ul className="mt-6 space-y-4 text-[0.875rem] text-ink-soft">
            <li>
              <a
                href={`tel:${CONTACT.phoneTel}`}
                className="group flex items-center gap-3 transition-colors duration-300 hover:text-ink"
              >
                <Phone size={15} strokeWidth={1.6} className="shrink-0 text-brand-fg" />
                <span dir="ltr" className="tracking-wide">
                  {CONTACT.phoneDisplay}
                </span>
              </a>
            </li>
            <li className="flex items-start gap-3 leading-[1.75]">
              <MapPin size={15} strokeWidth={1.6} className="mt-0.5 shrink-0 text-brand-fg" />
              <span>{t.contact.address}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="container-x flex flex-col gap-3 py-6 text-[0.75rem] text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {t.brandFull}
          </p>

          <div className="flex items-center gap-5">
            <p>{t.footer.rights}</p>
            <button
              onClick={() => scrollToId('home')}
              className="icon-btn !h-8 !min-w-8"
              aria-label={t.nav.home}
            >
              <ArrowUp size={14} strokeWidth={1.8} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
