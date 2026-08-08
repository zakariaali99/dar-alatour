import { useLang } from '../lib/lang'
import { useReveal, useRule } from '../lib/motion'

type Props = {
  eyebrow: string
  title: string
  lead?: string
  align?: 'start' | 'center'
}

export default function SectionHead({ eyebrow, title, lead, align = 'start' }: Props) {
  const { lang } = useLang()
  const ref = useReveal<HTMLDivElement>({ children: '.rv', stagger: 0.12 }, [lang])
  const rule = useRule<HTMLDivElement>([lang])

  const centered = align === 'center'

  return (
    <div ref={ref} className={centered ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'}>
      <div className={`rv will-reveal flex items-center gap-3 ${centered ? 'justify-center' : ''}`}>
        <span className="h-px w-7 bg-gold" />
        <p className="eyebrow">{eyebrow}</p>
      </div>

      <h2 className="rv will-reveal mt-5 font-display text-[2rem] leading-[1.15] font-light tracking-[-0.015em] text-ink sm:text-[2.6rem] lg:text-[3rem]">
        {title}
      </h2>

      {lead && (
        <p className="rv will-reveal mt-5 text-[0.98rem] leading-[1.8] text-ink-soft md:text-base">{lead}</p>
      )}

      <div ref={rule} className="rule mt-9 w-full max-w-[7rem]" />
    </div>
  )
}
