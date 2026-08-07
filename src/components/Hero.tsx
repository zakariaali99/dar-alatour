import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Sparkles, ArrowLeft, ArrowRight, Building2 } from 'lucide-react';

export const Hero: React.FC = () => {
  const { t, dir } = useLanguage();

  return (
    <section id="hero" className="relative pt-44 pb-24 md:pt-52 md:pb-32 overflow-hidden bg-gradient-to-b from-cream-50 via-cream-100 to-cream-200">
      
      {/* Background Soft Gold Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[650px] h-[650px] bg-gold-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-emerald-900/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          
          {/* Content Column */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cream-200 border border-gold-500/30 text-gold-700 text-xs font-bold tracking-wider mb-6 shadow-sm">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t('heroSubtitle')}</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-obsidian leading-tight mb-6 font-serif">
              {t('heroTitle')}
            </h1>

            <p className="text-base md:text-lg text-obsidian/75 leading-relaxed mb-8 max-w-xl">
              {t('heroDescription')}
            </p>

            <div className="flex flex-wrap gap-4 mb-12">
              <a
                href="#specialties"
                className="px-8 py-4 rounded-full bg-gradient-to-r from-gold-600 via-gold-500 to-gold-600 text-white font-bold text-sm shadow-gold-soft hover:shadow-lg hover:-translate-y-0.5 transition-all flex items-center gap-2"
              >
                <span>{t('btnExploreSpecialties')}</span>
                {dir === 'rtl' ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
              </a>

              <a
                href="#partnerships"
                className="px-8 py-4 rounded-full bg-cream-200/90 border border-gold-500/40 text-obsidian font-bold text-sm hover:bg-gold-500 hover:text-white transition-all flex items-center gap-2 shadow-sm"
              >
                <Building2 className="w-4 h-4" />
                <span>{t('btnContactB2B')}</span>
              </a>
            </div>

            {/* Corporate Stats Row */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-gold-500/20">
              <div>
                <span className="block text-2xl md:text-3xl font-black text-gold-700 font-serif">
                  {t('statBottles')}
                </span>
                <span className="text-xs text-obsidian/65 font-medium">
                  {t('statBottlesText')}
                </span>
              </div>
              <div>
                <span className="block text-2xl md:text-3xl font-black text-gold-700 font-serif">
                  {t('statClients')}
                </span>
                <span className="text-xs text-obsidian/65 font-medium">
                  {t('statClientsText')}
                </span>
              </div>
              <div>
                <span className="block text-2xl md:text-3xl font-black text-gold-700 font-serif">
                  {t('statSupport')}
                </span>
                <span className="text-xs text-obsidian/65 font-medium">
                  {t('statSupportText')}
                </span>
              </div>
            </div>

          </div>

          {/* Visual Column: Floating Luxury Perfume Bottle with Clean Logo Emblem */}
          <div className="relative flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-tr from-gold-400/20 to-emerald-900/10 rounded-3xl blur-2xl transform rotate-3 scale-95" />
            
            <div className="relative p-6 rounded-3xl bg-white/80 border border-gold-500/30 shadow-luxury backdrop-blur-sm">
              <img
                src="assets/images/hero_perfume.png"
                alt="خلاصة العطور المتميزة"
                className="w-full max-w-md h-auto rounded-2xl object-cover shadow-md hover:scale-[1.02] transition-transform duration-500"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
