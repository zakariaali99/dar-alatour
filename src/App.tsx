import { useEffect } from 'react'
import Nav from './components/Nav'
import Hero from './components/Hero'
import About from './components/About'
import Services from './components/Services'
import Values from './components/Values'
import Contact from './components/Contact'
import CtaBand from './components/CtaBand'
import Footer from './components/Footer'
import ScrollProgress from './components/ScrollProgress'
import WhatsAppFab from './components/WhatsAppFab'
import { ScrollTrigger } from './lib/motion'
import { useSmoothScroll } from './lib/smooth'
import { useLang } from './lib/lang'

export default function App() {
  const { lang } = useLang()

  useSmoothScroll()

  // Layout shifts when the language (and direction) flips.
  useEffect(() => {
    const id = window.setTimeout(() => ScrollTrigger.refresh(), 150)
    return () => window.clearTimeout(id)
  }, [lang])

  return (
    <div className="grain relative min-h-screen bg-cream">
      <ScrollProgress />
      <Nav />
      <main>
        <Hero />
        <About />
        <Services />
        <Values />
        <Contact />
        <CtaBand />
      </main>
      <Footer />
      <WhatsAppFab />
    </div>
  )
}
