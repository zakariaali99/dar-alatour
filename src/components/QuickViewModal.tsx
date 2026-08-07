import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Product } from '../types';
import { X, Plus } from 'lucide-react';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  product,
  onClose,
  onAddToCart,
}) => {
  const { lang, t } = useLanguage();

  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 bg-obsidian/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-cream-50 rounded-3xl p-6 md:p-8 max-w-lg w-full relative border border-gold-500/30 shadow-2xl animate-in zoom-in-95">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-full text-obsidian/60 hover:text-obsidian hover:bg-cream-200 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center">
          <img
            src={product.image}
            alt={lang === 'ar' ? product.nameAr : product.nameEn}
            className="w-44 h-44 object-cover rounded-2xl mx-auto mb-4 border-2 border-gold-500 shadow-md"
          />

          <span className="inline-block px-3 py-1 rounded-full bg-cream-200 text-gold-700 text-xs font-bold mb-2">
            {lang === 'ar' ? product.concentrationAr : product.concentrationEn}
          </span>

          <h3 className="text-xl font-bold text-obsidian font-serif mb-2">
            {lang === 'ar' ? product.nameAr : product.nameEn}
          </h3>

          <p className="text-xs text-obsidian/70 mb-6 leading-relaxed">
            <strong>{t('topNotesTitle')}:</strong> {lang === 'ar' ? product.topNotesAr : product.topNotesEn}<br />
            <strong>{t('heartNotesTitle')}:</strong> {lang === 'ar' ? product.heartNotesAr : product.heartNotesEn}<br />
            <strong>{t('baseNotesTitle')}:</strong> {lang === 'ar' ? product.baseNotesAr : product.baseNotesEn}
          </p>

          <button
            onClick={() => {
              onAddToCart(product);
              onClose();
            }}
            className="w-full py-3.5 rounded-full bg-gradient-to-r from-gold-600 to-gold-500 text-white font-bold text-xs shadow-gold-soft hover:shadow-lg transition-all flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>{t('btnAddBag')}</span>
          </button>
        </div>

      </div>
    </div>
  );
};
