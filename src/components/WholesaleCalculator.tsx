import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { CheckCircle2, MessageSquare } from 'lucide-react';

export const WholesaleCalculator: React.FC = () => {
  const { lang, t } = useLanguage();
  const [productType, setProductType] = useState<string>('perfumes');
  const [volume, setVolume] = useState<number>(100);
  const [privateLabel, setPrivateLabel] = useState<string>('no');

  const getDiscount = () => {
    if (volume >= 500) return '25%';
    if (volume >= 200) return '18%';
    return '10%';
  };

  const getTierName = () => {
    if (volume >= 500) return lang === 'ar' ? 'شريحة موزعين رئيسية (VIP Distributor)' : 'VIP Distributor Tier';
    if (volume >= 200) return lang === 'ar' ? 'شريحة محلات وصيدليات (Standard Wholesale)' : 'Standard Wholesale Tier';
    return lang === 'ar' ? 'طلب جملة استاندار' : 'Standard Bulk Request';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const phone = "218914091100"; // Direct Libyan contact provided: 0914091100
    
    const prodTypeName = productType === 'perfumes' ? 'العطور الفاخرة'
      : productType === 'oud' ? 'دهن العود والبخور'
      : productType === 'oils' ? 'الزيوت العطرية الخام'
      : 'مستحضرات التجميل والزينة';

    const msg = `مرحباً شركة دار العطور 👋\nأود الاستفسار عن طلب جملة وتوريد:\n• نوع المنتجات: ${prodTypeName}\n• الكمية المطلوبة: ${volume} عبوة/كجم\n• تصميم خاص (Private Label): ${privateLabel === 'yes' ? 'نعم' : 'لا'}\n• الشريحة التقديرية: ${getTierName()}\n\nيرجى تزويدي بأفضل عروض الأسعار.`;

    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <section id="wholesale" className="py-24 bg-cream-50">
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
          
          {/* Form */}
          <div className="cream-card p-8 md:p-10 rounded-3xl border border-gold-500/30">
            <h3 className="text-xl font-bold text-obsidian font-serif mb-6">
              {t('calcFormTitle')}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-obsidian/80 mb-2">
                  {t('labelProdType')}
                </label>
                <select
                  value={productType}
                  onChange={(e) => setProductType(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-cream-100 border border-gold-500/30 text-obsidian text-sm font-medium focus:outline-none focus:border-gold-500"
                >
                  <option value="perfumes">العطور الفاخرة الجاهزة</option>
                  <option value="oud">دهن العود والبخور المعطر</option>
                  <option value="oils">الزيوت العطرية الخام (كجم)</option>
                  <option value="cosmetics">مستحضرات التجميل والزينة</option>
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
                  {t('labelCustomBottling')}
                </label>
                <select
                  value={privateLabel}
                  onChange={(e) => setPrivateLabel(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-cream-100 border border-gold-500/30 text-obsidian text-sm font-medium focus:outline-none focus:border-gold-500"
                >
                  <option value="no">{t('no')}</option>
                  <option value="yes">{t('yes')}</option>
                </select>
              </div>

              <div className="p-4 rounded-xl bg-cream-100 border border-gold-500/20 text-xs leading-relaxed text-obsidian/80">
                <strong>الكمية:</strong> {volume} عبوة/كجم | <strong>الفئة:</strong> {getTierName()} | <strong>خصم التوريد:</strong> {getDiscount()}
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-full bg-gradient-to-r from-gold-600 via-gold-500 to-gold-600 text-white font-bold text-sm shadow-gold-soft hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>{t('btnSubmitWholesale')}</span>
              </button>
            </form>
          </div>

          {/* Benefits Info */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-obsidian font-serif mb-6">
              لماذا تختار شركة دار العطور كمورد رئيسي؟
            </h3>

            <div className="flex gap-4 items-start">
              <CheckCircle2 className="w-6 h-6 text-gold-600 shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-obsidian text-base mb-1">استيراد مباشر من المصادر العالمية</h4>
                <p className="text-xs text-obsidian/70 leading-relaxed">نضمن توريد خلاصات وزيوت عطرية 100% نقية وغير ممددة وفق المعايير الدولية.</p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <CheckCircle2 className="w-6 h-6 text-gold-600 shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-obsidian text-base mb-1">دعم لوجستي وسرعة التوصيل</h4>
                <p className="text-xs text-obsidian/70 leading-relaxed">شحن وتوصيل فوري لجميع المدن الليبية من مقرنا الإداري في طرابلس.</p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <CheckCircle2 className="w-6 h-6 text-gold-600 shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-obsidian text-base mb-1">أسعار تنافسية وتسهيلات كبار العملاء</h4>
                <p className="text-xs text-obsidian/70 leading-relaxed">أسعار جملة مخصصة وعقود توريد سنوية للمؤسسات والمحلات التجارية.</p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
