import { useLang } from '../lib/lang'
import { useReveal } from '../lib/motion'
import SectionHead from './SectionHead'

export default function Values() {
  const { t, lang } = useLang()
  const list = useReveal<HTMLDivElement>({ children: '.row', stagger: 0.11, y: 28 }, [lang])

  return (
    <section id="values" className="relative overflow-hidden border-t border-line bg-paper py-24 md:py-32">
      {/* whisper of brand colour, nothing more */}
      <div className="pointer-events-none absolute -end-40 top-1/3 h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(circle,var(--color-brand-tint)_0%,transparent_70%)] opacity-55 blur-2xl" />

      <div className="container-x relative">
        <SectionHead eyebrow={t.values.eyebrow} title={t.values.title} align="center" />

        <div ref={list} className="mx-auto mt-14 max-w-4xl">
          {t.values.items.map((v, i) => (
            <div
              key={v.t}
              className="row will-reveal group grid grid-cols-[auto_1fr] items-baseline gap-x-5 gap-y-2 border-b border-line py-7 transition-colors duration-500 hover:border-brand/30 sm:grid-cols-[3rem_1fr_1.6fr] sm:gap-x-8"
            >
              <span className="font-display text-sm text-gold transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:translate-x-1 rtl:group-hover:-translate-x-1">
                {String(i + 1).padStart(2, '0')}
              </span>

              <h3 className="font-display text-xl font-normal text-ink md:text-[1.4rem]">{v.t}</h3>

              <p className="col-span-2 text-[0.9rem] leading-[1.8] text-ink-soft sm:col-span-1">{v.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
