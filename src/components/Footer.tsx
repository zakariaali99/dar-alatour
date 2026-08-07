import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { MapPin, Phone, Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer id="footer" className="bg-obsidian text-cream-100 pt-16 pb-8 border-t-2 border-gold-500">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
        
        {/* Brand Info */}
        <div>
          <div className="flex items-center gap-3.5 mb-4">
            <img
              src="assets/images/logo_clean.png"
              alt="شركة دار العطور"
              className="h-14 w-auto object-contain"
            />
            <div>
              <h3 className="font-bold text-lg text-cream-50 font-serif">شركة دار العطور</h3>
              <span className="text-[10px] text-gold-400 font-sans tracking-widest block">
                DAR AL-ATOUR COMPANY
              </span>
            </div>
          </div>
          <p className="text-xs text-cream-300/70 leading-relaxed">
            شركة ليبية متخصصة في استيراد العطور العالمية الفاخرة، والزيوت العطرية الخام ومستحضرات التجميل عالية الجودة.
          </p>
        </div>

        {/* Location */}
        <div>
          <h4 className="font-bold text-sm text-gold-400 mb-4 font-serif uppercase tracking-wider">
            {t('footerAddressTitle')}
          </h4>
          <p className="flex items-center gap-2 text-xs text-cream-200">
            <MapPin className="w-4 h-4 text-gold-400 shrink-0" />
            <span>{t('footerAddress')}</span>
          </p>
        </div>

        {/* Direct Corporate Contact */}
        <div>
          <h4 className="font-bold text-sm text-gold-400 mb-4 font-serif uppercase tracking-wider">
            {t('footerPhoneTitle')}
          </h4>
          <p className="flex items-center gap-2 text-xs text-cream-200 mb-2">
            <Phone className="w-4 h-4 text-gold-400 shrink-0" />
            <a href="tel:0914091100" className="hover:text-gold-400 transition-colors">
              0914091100 (+218 91 409 1100)
            </a>
          </p>
          <p className="flex items-center gap-2 text-xs text-cream-200">
            <Mail className="w-4 h-4 text-gold-400 shrink-0" />
            <span>info@dar-alatour.ly</span>
          </p>
        </div>

      </div>

      <div className="max-w-7xl mx-auto px-6 pt-6 border-t border-cream-200/10 text-center text-xs text-cream-400/60">
        <p>{t('footerRights')}</p>
      </div>
    </footer>
  );
};
