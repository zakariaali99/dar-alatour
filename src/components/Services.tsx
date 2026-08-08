import { Ship, PackageCheck, Truck } from 'lucide-react'
import { useLang } from '../lib/lang'
import { useReveal } from '../lib/motion'
import SectionHead from './SectionHead'

const ICONS = [Ship, PackageCheck, Truck]

export default function Services() {
  const { t, lang } = useLang()
  const grid = useReveal<HTMLDivElement>({ children: '.card', stagger: 0.14, y: 34 }, [lang])

  return (
    <section id="services" className="relative border-t border-line py-24 md:py-32">
      <div className="container-x">
        <SectionHead eyebrow={t.services.eyebrow} title={t.services.title} lead={t.services.lead} />

        <div ref={grid} className="mt-14 grid gap-5 md:grid-cols-3 md:gap-6">
          {t.services.items.map((item, i) => {
            const Icon = ICONS[i]
            return (
              <article key={item.n} className="card will-reveal group flex flex-col p-8 md:p-9">
                <div className="flex items-start justify-between">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-tint text-brand-fg transition-all duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-105 group-hover:bg-brand group-hover:text-on-brand">
                    <Icon size={19} strokeWidth={1.5} />
                  </span>
                  <span className="font-display text-sm tracking-widest text-muted/70">{item.n}</span>
                </div>

                <h3 className="mt-7 font-display text-[1.35rem] font-normal text-ink md:text-2xl">
                  {item.t}
                </h3>

                <p className="mt-3.5 flex-1 text-[0.9rem] leading-[1.8] text-ink-soft">{item.d}</p>

                <span className="mt-7 block h-px w-9 bg-gold transition-all duration-600 ease-[cubic-bezier(.22,1,.36,1)] group-hover:w-16" />
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
