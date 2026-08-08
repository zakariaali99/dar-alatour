import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { content, type Copy, type Lang } from '../content'

type Ctx = {
  lang: Lang
  t: Copy
  isAr: boolean
  toggle: () => void
}

const LangContext = createContext<Ctx | null>(null)

const STORAGE_KEY = 'dar-alatour-lang'

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(() => {
    // ?lang=en makes the language shareable in a link; otherwise fall back to
    // the visitor's last choice, then to Arabic.
    const fromUrl = new URLSearchParams(window.location.search).get('lang')
    if (fromUrl === 'en' || fromUrl === 'ar') return fromUrl

    const saved = localStorage.getItem(STORAGE_KEY)
    return saved === 'en' || saved === 'ar' ? saved : 'ar'
  })

  useEffect(() => {
    const root = document.documentElement
    root.lang = lang
    root.dir = content[lang].dir
    localStorage.setItem(STORAGE_KEY, lang)
  }, [lang])

  const toggle = useCallback(() => setLang((l) => (l === 'ar' ? 'en' : 'ar')), [])

  const value = useMemo<Ctx>(
    () => ({ lang, t: content[lang] as unknown as Copy, isAr: lang === 'ar', toggle }),
    [lang, toggle],
  )

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>
}

export function useLang() {
  const ctx = useContext(LangContext)
  if (!ctx) throw new Error('useLang must be used inside LangProvider')
  return ctx
}
