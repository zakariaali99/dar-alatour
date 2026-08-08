import { useEffect, useState } from 'react'
import { MessageCircle } from 'lucide-react'
import { useLang } from '../lib/lang'
import { CONTACT } from '../content'

export default function WhatsAppFab() {
  const { t } = useLang()
  const [show, setShow] = useState(false)

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.7)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const href = `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(t.contact.waMessage)}`

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={t.contact.wa}
      className={`group fixed bottom-6 end-6 z-50 flex h-13 w-13 items-center justify-center rounded-full bg-brand text-on-brand shadow-[0_16px_36px_-14px_rgba(22,79,68,0.75)] transition-all duration-600 ease-[cubic-bezier(.22,1,.36,1)] hover:bg-brand-deep ${
        show ? 'translate-y-0 scale-100 opacity-100' : 'pointer-events-none translate-y-5 scale-90 opacity-0'
      }`}
    >
      <span className="absolute inset-0 rounded-full bg-brand/35 transition-transform duration-1000 group-hover:scale-125 group-hover:opacity-0" />
      <MessageCircle size={21} strokeWidth={1.7} className="relative" />
    </a>
  )
}
