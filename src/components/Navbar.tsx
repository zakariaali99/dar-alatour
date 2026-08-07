import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Globe, PhoneCall } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { lang, setLang, t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="bg-emerald-950 text-gold-300 text-xs py-2 px-4 text-center border-b border-gold-500/30 flex items-center justify-center gap-2 font-medium tracking-wide">
        <span className="inline-block w-2 h-2 rounded-full bg-gold-400 animate-pulse"></span>
        {t('topBarAnnouncement')}
      </div>

      {/* Main Header */}
      <header
        className={`fixed left-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? 'top-0 bg-cream-50/95 backdrop-blur-md shadow-luxury py-3 border-b border-gold-500/20'
            : 'top-[33px] bg-cream-100/80 backdrop-blur-sm py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          
          {/* Brand Logo with precision transparent background */}
          <a href="#" className="flex items-center gap-3.5 text-obsidian no-underline group">
            <img
              src="assets/images/logo_clean.png"
              alt="شركة دار العطور"
              className="h-14 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
            <div className="flex flex-col">
              <span className="font-bold text-lg leading-tight text-obsidian font-serif">
                شركة دار العطور
              </span>
              <span className="text-[10px] tracking-widest text-gold-700 font-sans font-semibold">
                DAR AL-ATOUR COMPANY
              </span>
            </div>
          </a>

          {/* Corporate Navigation Menu */}
          <nav className="hidden lg:flex items-center gap-7">
            <a href="#hero" className="text-sm font-semibold text-obsidian/85 hover:text-gold-700 transition-colors">
              {t('navHome')}
            </a>
            <a href="#about" className="text-sm font-semibold text-obsidian/85 hover:text-gold-700 transition-colors">
              {t('navAbout')}
            </a>
            <a href="#specialties" className="text-sm font-semibold text-obsidian/85 hover:text-gold-700 transition-colors">
              {t('navSpecialties')}
            </a>
            <a href="#philosophy" className="text-sm font-semibold text-obsidian/85 hover:text-gold-700 transition-colors">
              {t('navPhilosophy')}
            </a>
            <a href="#partnerships" className="text-sm font-semibold text-obsidian/85 hover:text-gold-700 transition-colors">
              {t('navPartnerships')}
            </a>
            <a href="#footer" className="text-sm font-semibold text-obsidian/85 hover:text-gold-700 transition-colors">
              {t('navContact')}
            </a>
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            {/* Language Switcher */}
            <button
              onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-gold-500/40 bg-cream-200/80 text-obsidian hover:bg-gold-500 hover:text-white transition-all text-xs font-bold shadow-sm"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{lang === 'ar' ? 'English' : 'العربية'}</span>
            </button>

            {/* Corporate Contact Button */}
            <a
              href="#partnerships"
              className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-gold-600 to-gold-500 text-white font-bold text-xs shadow-gold-soft hover:shadow-lg transition-all"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>{t('btnCorporateInquiry')}</span>
            </a>
          </div>

        </div>
      </header>
    </>
  );
};
