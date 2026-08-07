import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Product } from '../types';
import { X, Trash2, MessageSquare } from 'lucide-react';

interface InquiryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: Product[];
  onRemoveItem: (index: number) => void;
}

export const InquiryDrawer: React.FC<InquiryDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onRemoveItem,
}) => {
  const { lang } = useLanguage();

  if (!isOpen) return null;

  const handleSendWhatsapp = () => {
    if (!items.length) return;
    const phone = "218914091100"; // Direct Libyan contact provided: 0914091100

    const itemsText = items
      .map((item, idx) => `${idx + 1}. ${lang === 'ar' ? item.nameAr : item.nameEn}`)
      .join('\n');

    const msg = `مرحباً شركة دار العطور 👋\nأود طلب عينات واستفسار عن العطور التالية من الموقع:\n\n${itemsText}\n\nيرجى التواصل وتزويدي بالتفاصيل والأسعار.`;

    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 bg-obsidian/60 backdrop-blur-sm flex justify-end">
      <div className="w-full max-w-md bg-cream-50 h-full p-6 shadow-2xl flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right">
        
        <div>
          <div className="flex items-center justify-between pb-4 border-b border-gold-500/20 mb-6">
            <h3 className="font-bold text-lg text-obsidian font-serif">
              {lang === 'ar' ? 'حقيبة الاستفسارات والعينات' : 'Inquiry Bag'}
            </h3>
            <button
              onClick={onClose}
              className="p-1 rounded-full text-obsidian/60 hover:text-obsidian hover:bg-cream-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {items.length === 0 ? (
            <div className="text-center py-12 text-obsidian/50 text-sm">
              {lang === 'ar' ? 'حقيبة الاستفسارات فارغة حالياً.' : 'Your inquiry bag is empty.'}
            </div>
          ) : (
            <div className="space-y-3">
              {items.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3 rounded-xl bg-white border border-gold-500/20 shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={item.image}
                      alt={lang === 'ar' ? item.nameAr : item.nameEn}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div>
                      <h4 className="font-bold text-xs text-obsidian font-serif">
                        {lang === 'ar' ? item.nameAr : item.nameEn}
                      </h4>
                      <span className="text-[10px] text-gold-700 font-semibold">
                        {lang === 'ar' ? item.concentrationAr : item.concentrationEn}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => onRemoveItem(idx)}
                    className="text-red-500 hover:text-red-700 p-1"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="pt-6 border-t border-gold-500/20 mt-6">
            <button
              onClick={handleSendWhatsapp}
              className="w-full py-4 rounded-full bg-gradient-to-r from-gold-600 via-gold-500 to-gold-600 text-white font-bold text-xs shadow-gold-soft hover:shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              <span>
                {lang === 'ar'
                  ? 'إرسال الطلب عبر الواتساب (0914091100)'
                  : 'Submit Order via WhatsApp (0914091100)'}
              </span>
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
