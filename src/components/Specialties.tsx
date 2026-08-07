import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Sparkles, Crown, Droplets, Sparkle } from 'lucide-react';

export const Specialties: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="specialties" className="py-24 bg-cream-50">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold tracking-widest text-gold-700 uppercase mb-2 block">
            {t('specialtiesBadge')}
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-obsidian font-serif mb-4">
            {t('specialtiesTitle')}
          </h2>
          <p className="text-sm md:text-base text-obsidian/70">
            {t('specialtiesSubtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Division 1 */}
          <div className="cream-card rounded-3xl p-8 border border-gold-500/20 flex flex-col hover:-translate-y-2 transition-all duration-300 shadow-sm">
            <div className="w-16 h-16 rounded-2xl bg-gold-400/20 border border-gold-500/30 flex items-center justify-center text-gold-700 mb-6">
              <Crown className="w-8 h-8" />
            </div>

            <h3 className="text-xl font-bold text-obsidian mb-4 font-serif">
              {t('div1Title')}
            </h3>

            <p className="text-xs text-obsidian/75 leading-relaxed mb-6">
              {t('div1Desc')}
            </p>

            <div className="mt-auto pt-4 border-t border-gold-500/10 text-xs font-semibold text-gold-700 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" />
              <span>تركيزات عالية وجودة فرنسية وإيطالية</span>
            </div>
          </div>

          {/* Division 2 */}
          <div className="cream-card rounded-3xl p-8 border border-gold-500/20 flex flex-col hover:-translate-y-2 transition-all duration-300 shadow-sm">
            <div className="w-16 h-16 rounded-2xl bg-gold-400/20 border border-gold-500/30 flex items-center justify-center text-gold-700 mb-6">
              <Droplets className="w-8 h-8" />
            </div>

            <h3 className="text-xl font-bold text-obsidian mb-4 font-serif">
              {t('div2Title')}
            </h3>

            <p className="text-xs text-obsidian/75 leading-relaxed mb-6">
              {t('div2Desc')}
            </p>

            <div className="mt-auto pt-4 border-t border-gold-500/10 text-xs font-semibold text-gold-700 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" />
              <span>خلاصات كمبودية وموروكية 100% نقية</span>
            </div>
          </div>

          {/* Division 3 */}
          <div className="cream-card rounded-3xl p-8 border border-gold-500/20 flex flex-col hover:-translate-y-2 transition-all duration-300 shadow-sm">
            <div className="w-16 h-16 rounded-2xl bg-gold-400/20 border border-gold-500/30 flex items-center justify-center text-gold-700 mb-6">
              <Sparkle className="w-8 h-8" />
            </div>

            <h3 className="text-xl font-bold text-obsidian mb-4 font-serif">
              {t('div3Title')}
            </h3>

            <p className="text-xs text-obsidian/75 leading-relaxed mb-6">
              {t('div3Desc')}
            </p>

            <div className="mt-auto pt-4 border-t border-gold-500/10 text-xs font-semibold text-gold-700 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" />
              <span>منتجات عناية وتجميل ملكية مستوردة</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
