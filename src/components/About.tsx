import { useLang } from '../lib/lang'
import { useReveal } from '../lib/motion'
import SectionHead from './SectionHead'

export default function About() {
  const { t, lang } = useLang()
  const body = useReveal<HTMLDivElement>({ children: '.rv', stagger: 0.13, start: 'top 82%' }, [lang])

  return (
    <section id="about" className="relative border-t border-line bg-paper py-24 md:py-32">
      <div className="container-x grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <SectionHead eyebrow={t.about.eyebrow} title={t.about.title} />

        <div ref={body} className="lg:pt-3">
          <p className="rv will-reveal font-display text-xl leading-[1.6] font-light text-ink md:text-[1.6rem]">
            {t.about.p1}
          </p>

          <p className="rv will-reveal mt-7 text-[0.98rem] leading-[1.9] text-ink-soft md:text-base">
            {t.about.p2}
          </p>

          <figure className="rv will-reveal mt-11 border-s-2 border-brand-fg/40 ps-6">
            <blockquote className="font-display text-lg leading-[1.65] font-light text-ink-soft italic md:text-xl rtl:not-italic">
              {t.about.quote}
            </blockquote>
          </figure>
        </div>
      </div>
    </section>
  )
}
