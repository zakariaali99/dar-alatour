import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Building2, MessageSquare, CheckCircle2 } from 'lucide-react';

export const Partnerships: React.FC = () => {
  const { lang, t } = useLanguage();
  const [prodCategory, setProdCategory] = useState<string>('perfumes');
  const [volume, setVolume] = useState<number>(100);
  const [notes, setNotes] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const phone = "218914091100"; // Direct Libyan line: 0914091100

    const catName = prodCategory === 'perfumes' ? 'العطور العالمية الفاخرة'
      : prodCategory === 'oud' ? 'دهن العود والزيوت العطرية الخام'
      : 'مستحضرات التجميل ومواد الزينة';

    const msg = `مرحباً شركة دار العطور 👋\nأود طلب استفسار وتوريد تجاري لشركتنا/مؤسستنا:\n• الفئة المطلوبة: ${catName}\n• الكمية التقديرية: ${volume} عبوة/كجم\n• ملاحظات أخرى: ${notes || 'لا يوجد'}\n\nيرجى التواصل وتزويدنا بتفاصيل التوريد والشراكة.`;

    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <section id="partnerships" className="py-24 bg-cream-100 relative">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold tracking-widest text-gold-700 uppercase mb-2 block">
            {t('b2bBadge')}
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-obsidian font-serif mb-4">
            {t('b2bTitle')}
          </h2>
          <p className="text-sm md:text-base text-obsidian/70">
            {t('b2bSubtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          
          {/* Corporate Inquiry Form */}
          <div className="cream-card p-8 md:p-10 rounded-3xl border border-gold-500/30">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gold-400/20 flex items-center justify-center text-gold-700">
                <Building2 className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-obsidian font-serif">
                نموذج الاستفسارات التجارية والتوريد
              </h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-obsidian/80 mb-2">
                  {t('labelProdType')}
                </label>
                <select
                  value={prodCategory}
                  onChange={(e) => setProdCategory(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-cream-100 border border-gold-500/30 text-obsidian text-sm font-medium focus:outline-none focus:border-gold-500"
                >
                  <option value="perfumes">قسم العطور العالمية الفاخرة</option>
                  <option value="oud">قسم العود والزيوت العطرية الخام</option>
                  <option value="cosmetics">قسم مستحضرات التجميل ومواد الزينة</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-obsidian/80 mb-2">
                  {t('labelVolume')}
                </label>
                <input
                  type="number"
                  value={volume}
                  min={50}
                  step={50}
                  onChange={(e) => setVolume(parseInt(e.target.value, 10) || 50)}
                  className="w-full px-4 py-3 rounded-xl bg-cream-100 border border-gold-500/30 text-obsidian text-sm font-medium focus:outline-none focus:border-gold-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-obsidian/80 mb-2">
                  {t('labelNotes')}
                </label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder={lang === 'ar' ? 'اكتب أي تفاصيل خاصة بمؤسستك...' : 'Enter any specific organization notes...'}
                  className="w-full px-4 py-3 rounded-xl bg-cream-100 border border-gold-500/30 text-obsidian text-sm font-medium focus:outline-none focus:border-gold-500 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-full bg-gradient-to-r from-gold-600 via-gold-500 to-gold-600 text-white font-bold text-sm shadow-gold-soft hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>{t('btnSubmitCorporate')}</span>
              </button>
            </form>
          </div>

          {/* Corporate Guarantees */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-obsidian font-serif mb-6">
              التزامنا تجاه الشركات والشراكات التجارية
            </h3>

            <div className="flex gap-4 items-start">
              <CheckCircle2 className="w-6 h-6 text-gold-600 shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-obsidian text-base mb-1">توريد مباشر وموثق</h4>
                <p className="text-xs text-obsidian/70 leading-relaxed">نضمن مطابقة جميع الشحنات العطرية والزيوت المستوردة لأعلى المعايير الصحية والمواصفات الرسمية.</p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <CheckCircle2 className="w-6 h-6 text-gold-600 shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-obsidian text-base mb-1">حلول توريد مخصصة للموزعين</h4>
                <p className="text-xs text-obsidian/70 leading-relaxed">تسهيلات خاصة للصيدليات الكبرى، مراكز التجميل، وشبكات التوزيع التجارية في طرابلس وكافة الأقاليم.</p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <CheckCircle2 className="w-6 h-6 text-gold-600 shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-obsidian text-base mb-1">دعم فني واستشاري متواصل</h4>
                <p className="text-xs text-obsidian/70 leading-relaxed">فريقنا الفني يقدم الاستشارات حول اختيار أفضل التركيزات والعوائل العطرية المناسبة لسوقكم المستهدف.</p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
