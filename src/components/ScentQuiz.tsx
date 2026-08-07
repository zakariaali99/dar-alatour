import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Sparkles, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';

export const ScentQuiz: React.FC = () => {
  const { lang, t } = useLanguage();
  const [step, setStep] = useState<number>(1);
  const [answers, setAnswers] = useState<{ mood?: string; family?: string; time?: string }>({});
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const handleSelect = (key: 'mood' | 'family' | 'time', value: string) => {
    const updated = { ...answers, [key]: value };
    setAnswers(updated);

    if (step < 3) {
      setStep(step + 1);
    } else {
      setIsCompleted(true);
      if (confetti) {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      }
    }
  };

  const handleReset = () => {
    setStep(1);
    setAnswers({});
    setIsCompleted(false);
  };

  return (
    <section id="quiz" className="py-24 bg-cream-100 relative">
      <div className="max-w-4xl mx-auto px-6">
        
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold tracking-widest text-gold-700 uppercase mb-2 block">
            {t('quizBadge')}
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-obsidian font-serif mb-4">
            {t('quizTitle')}
          </h2>
          <p className="text-sm md:text-base text-obsidian/70">
            {t('quizSubtitle')}
          </p>
        </div>

        <div className="cream-card p-8 md:p-12 rounded-3xl border border-gold-500/30">
          
          {!isCompleted ? (
            <div>
              
              {/* Step 1 */}
              {step === 1 && (
                <div>
                  <h3 className="text-xl font-bold text-obsidian text-center mb-8 font-serif">
                    {t('quizStep1')}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <button
                      onClick={() => handleSelect('mood', 'royal')}
                      className="p-6 rounded-2xl bg-cream-100 hover:bg-gold-500 hover:text-white transition-all text-center font-bold text-sm text-obsidian border border-gold-500/20 shadow-sm"
                    >
                      {t('quizOpt1a')}
                    </button>
                    <button
                      onClick={() => handleSelect('mood', 'calm')}
                      className="p-6 rounded-2xl bg-cream-100 hover:bg-gold-500 hover:text-white transition-all text-center font-bold text-sm text-obsidian border border-gold-500/20 shadow-sm"
                    >
                      {t('quizOpt1b')}
                    </button>
                    <button
                      onClick={() => handleSelect('mood', 'fresh')}
                      className="p-6 rounded-2xl bg-cream-100 hover:bg-gold-500 hover:text-white transition-all text-center font-bold text-sm text-obsidian border border-gold-500/20 shadow-sm"
                    >
                      {t('quizOpt1c')}
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2 */}
              {step === 2 && (
                <div>
                  <h3 className="text-xl font-bold text-obsidian text-center mb-8 font-serif">
                    {t('quizStep2')}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <button
                      onClick={() => handleSelect('family', 'oud')}
                      className="p-6 rounded-2xl bg-cream-100 hover:bg-gold-500 hover:text-white transition-all text-center font-bold text-sm text-obsidian border border-gold-500/20 shadow-sm"
                    >
                      {t('quizOpt2a')}
                    </button>
                    <button
                      onClick={() => handleSelect('family', 'rose')}
                      className="p-6 rounded-2xl bg-cream-100 hover:bg-gold-500 hover:text-white transition-all text-center font-bold text-sm text-obsidian border border-gold-500/20 shadow-sm"
                    >
                      {t('quizOpt2b')}
                    </button>
                    <button
                      onClick={() => handleSelect('family', 'citrus')}
                      className="p-6 rounded-2xl bg-cream-100 hover:bg-gold-500 hover:text-white transition-all text-center font-bold text-sm text-obsidian border border-gold-500/20 shadow-sm"
                    >
                      {t('quizOpt2c')}
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3 */}
              {step === 3 && (
                <div>
                  <h3 className="text-xl font-bold text-obsidian text-center mb-8 font-serif">
                    {t('quizStep3')}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <button
                      onClick={() => handleSelect('time', 'evening')}
                      className="p-6 rounded-2xl bg-cream-100 hover:bg-gold-500 hover:text-white transition-all text-center font-bold text-sm text-obsidian border border-gold-500/20 shadow-sm"
                    >
                      {t('quizOpt3a')}
                    </button>
                    <button
                      onClick={() => handleSelect('time', 'daily')}
                      className="p-6 rounded-2xl bg-cream-100 hover:bg-gold-500 hover:text-white transition-all text-center font-bold text-sm text-obsidian border border-gold-500/20 shadow-sm"
                    >
                      {t('quizOpt3b')}
                    </button>
                    <button
                      onClick={() => handleSelect('time', 'special')}
                      className="p-6 rounded-2xl bg-cream-100 hover:bg-gold-500 hover:text-white transition-all text-center font-bold text-sm text-obsidian border border-gold-500/20 shadow-sm"
                    >
                      {t('quizOpt3c')}
                    </button>
                  </div>
                </div>
              )}

            </div>
          ) : (
            /* Quiz Result */
            <div className="text-center py-4">
              <img
                src="assets/images/hero_perfume.png"
                alt="العطر الموصى به"
                className="w-40 h-40 object-cover rounded-full mx-auto mb-6 border-4 border-gold-500 shadow-gold-soft"
              />
              <span className="text-xs font-bold tracking-widest text-gold-700 uppercase block mb-2">
                {t('quizResultTitle')}
              </span>
              <h3 className="text-2xl font-black text-obsidian font-serif mb-3">
                {lang === 'ar' ? 'أمبروسيا الملكي | Ambrosia Imperial' : 'Ambrosia Imperial'}
              </h3>
              <p className="text-sm text-obsidian/70 max-w-lg mx-auto mb-8">
                {lang === 'ar'
                  ? 'سمفونية ملكية حصرية تجمع بين العود الكمبودي المعتق والورد الطائفي ولحون العنبر الدافئة.'
                  : 'An exclusive imperial symphony blending aged Cambodian oud, Taif rose, and warm amber notes.'}
              </p>
              
              <button
                onClick={handleReset}
                className="px-6 py-3 rounded-full bg-cream-200 text-obsidian font-bold text-xs hover:bg-gold-500 hover:text-white transition-all inline-flex items-center gap-2"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>إعادة الاختبار</span>
              </button>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
