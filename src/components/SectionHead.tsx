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

      <h2 className="section-title rv will-reveal font-display mt-5 text-ink">{title}</h2>

      {lead && (
        <p className="rv will-reveal mt-5 text-[1rem] leading-[1.85] text-ink-soft md:text-[1.05rem]">{lead}</p>
      )}

      <div ref={rule} className="rule mt-9 w-full max-w-[7rem]" />
    </div>
  )
}
