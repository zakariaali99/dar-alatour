import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Award, Globe2, Truck, Users2 } from 'lucide-react';

export const Heritage: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="about" className="py-24 bg-cream-100 relative border-t border-gold-500/20">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* About Overview */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <span className="text-xs font-bold tracking-widest text-gold-700 uppercase mb-2 block">
            {t('aboutBadge')}
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-obsidian font-serif mb-6">
            {t('aboutTitle')}
          </h2>

          <p className="text-base md:text-lg text-obsidian/80 leading-relaxed mb-6">
            {t('aboutText1')}
          </p>

          <p className="text-sm md:text-base text-obsidian/65 leading-relaxed">
            {t('aboutText2')}
          </p>
        </div>

        {/* 4 Corporate Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="cream-card p-6 rounded-2xl border border-gold-500/20 text-center hover:-translate-y-1 transition-transform">
            <div className="w-12 h-12 rounded-xl bg-gold-400/20 border border-gold-500/30 flex items-center justify-center text-gold-700 mx-auto mb-4">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-obsidian text-base mb-2 font-serif">
              {t('pillar1Title')}
            </h3>
            <p className="text-xs text-obsidian/65 leading-relaxed">
              {t('pillar1Desc')}
            </p>
          </div>

          <div className="cream-card p-6 rounded-2xl border border-gold-500/20 text-center hover:-translate-y-1 transition-transform">
            <div className="w-12 h-12 rounded-xl bg-gold-400/20 border border-gold-500/30 flex items-center justify-center text-gold-700 mx-auto mb-4">
              <Globe2 className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-obsidian text-base mb-2 font-serif">
              {t('pillar2Title')}
            </h3>
            <p className="text-xs text-obsidian/65 leading-relaxed">
              {t('pillar2Desc')}
            </p>
          </div>

          <div className="cream-card p-6 rounded-2xl border border-gold-500/20 text-center hover:-translate-y-1 transition-transform">
            <div className="w-12 h-12 rounded-xl bg-gold-400/20 border border-gold-500/30 flex items-center justify-center text-gold-700 mx-auto mb-4">
              <Truck className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-obsidian text-base mb-2 font-serif">
              {t('pillar3Title')}
            </h3>
            <p className="text-xs text-obsidian/65 leading-relaxed">
              {t('pillar3Desc')}
            </p>
          </div>

          <div className="cream-card p-6 rounded-2xl border border-gold-500/20 text-center hover:-translate-y-1 transition-transform">
            <div className="w-12 h-12 rounded-xl bg-gold-400/20 border border-gold-500/30 flex items-center justify-center text-gold-700 mx-auto mb-4">
              <Users2 className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-obsidian text-base mb-2 font-serif">
              {t('pillar4Title')}
            </h3>
            <p className="text-xs text-obsidian/65 leading-relaxed">
              {t('pillar4Desc')}
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
