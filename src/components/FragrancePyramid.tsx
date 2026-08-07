import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Citrus, Flower2, TreePine } from 'lucide-react';

export const FragrancePyramid: React.FC = () => {
  const { t } = useLanguage();
  const [activeTier, setActiveTier] = useState<'top' | 'heart' | 'base'>('top');

  return (
    <section id="philosophy" className="py-24 bg-cream-50 relative">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold tracking-widest text-gold-700 uppercase mb-2 block">
            {t('philosophyBadge')}
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-obsidian font-serif mb-4">
            {t('philosophyTitle')}
          </h2>
          <p className="text-sm md:text-base text-obsidian/70">
            {t('philosophySubtitle')}
          </p>
        </div>

        <div className="max-w-3xl mx-auto flex flex-col gap-5">
          
          {/* Top Notes */}
          <div
            onClick={() => setActiveTier('top')}
            className={`p-6 rounded-2xl border transition-all cursor-pointer flex items-center gap-6 ${
              activeTier === 'top'
                ? 'bg-white border-gold-500 shadow-gold-soft scale-[1.01]'
                : 'bg-cream-200/60 border-gold-500/20 hover:bg-white'
            }`}
          >
            <div className="w-14 h-14 rounded-xl bg-gold-400/20 border border-gold-500/40 flex items-center justify-center text-gold-700 shrink-0">
              <Citrus className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-obsidian mb-1">
                {t('topNotesTitle')}
              </h3>
              <p className="text-sm text-obsidian/70">
                {t('topNotesDesc')}
              </p>
            </div>
          </div>

          {/* Heart Notes */}
          <div
            onClick={() => setActiveTier('heart')}
            className={`p-6 rounded-2xl border transition-all cursor-pointer flex items-center gap-6 ${
              activeTier === 'heart'
                ? 'bg-white border-gold-500 shadow-gold-soft scale-[1.01]'
                : 'bg-cream-200/60 border-gold-500/20 hover:bg-white'
            }`}
          >
            <div className="w-14 h-14 rounded-xl bg-gold-400/20 border border-gold-500/40 flex items-center justify-center text-gold-700 shrink-0">
              <Flower2 className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-obsidian mb-1">
                {t('heartNotesTitle')}
              </h3>
              <p className="text-sm text-obsidian/70">
                {t('heartNotesDesc')}
              </p>
            </div>
          </div>

          {/* Base Notes */}
          <div
            onClick={() => setActiveTier('base')}
            className={`p-6 rounded-2xl border transition-all cursor-pointer flex items-center gap-6 ${
              activeTier === 'base'
                ? 'bg-white border-gold-500 shadow-gold-soft scale-[1.01]'
                : 'bg-cream-200/60 border-gold-500/20 hover:bg-white'
            }`}
          >
            <div className="w-14 h-14 rounded-xl bg-gold-400/20 border border-gold-500/40 flex items-center justify-center text-gold-700 shrink-0">
              <TreePine className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-obsidian mb-1">
                {t('baseNotesTitle')}
              </h3>
              <p className="text-sm text-obsidian/70">
                {t('baseNotesDesc')}
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
