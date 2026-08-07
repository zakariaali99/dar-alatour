import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { PRODUCTS } from '../data/products';
import { Product } from '../types';
import { Eye, Plus } from 'lucide-react';

interface ProductCatalogProps {
  onAddToCart: (product: Product) => void;
  onQuickView: (product: Product) => void;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({ onAddToCart, onQuickView }) => {
  const { lang, t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', labelKey: 'catAll' },
    { id: 'perfumes', labelKey: 'catPerfumes' },
    { id: 'oud', labelKey: 'catOud' },
    { id: 'oils', labelKey: 'catOils' },
    { id: 'cosmetics', labelKey: 'catCosmetics' },
  ];

  const filteredProducts = activeCategory === 'all'
    ? PRODUCTS
    : PRODUCTS.filter(p => p.category === activeCategory);

  return (
    <section id="collections" className="py-24 bg-cream-50">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold tracking-widest text-gold-700 uppercase mb-2 block">
            {t('catalogBadge')}
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-obsidian font-serif mb-4">
            {t('catalogTitle')}
          </h2>
          <p className="text-sm md:text-base text-obsidian/70">
            {t('catalogSubtitle')}
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-14">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-6 py-2.5 rounded-full text-xs font-bold transition-all ${
                activeCategory === cat.id
                  ? 'bg-gradient-to-r from-gold-600 to-gold-500 text-white shadow-gold-soft scale-105'
                  : 'bg-cream-200 text-obsidian/80 hover:bg-gold-500/20'
              }`}
            >
              {t(cat.labelKey)}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="cream-card rounded-3xl overflow-hidden flex flex-col group hover:-translate-y-2 transition-all duration-300 border border-gold-500/20"
            >
              {/* Product Image */}
              <div className="relative h-72 overflow-hidden bg-cream-200">
                <span className="absolute top-4 right-4 z-10 bg-cream-50/90 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-bold text-gold-700 border border-gold-500/30">
                  {lang === 'ar' ? product.concentrationAr : product.concentrationEn}
                </span>

                <img
                  src={product.image}
                  alt={lang === 'ar' ? product.nameAr : product.nameEn}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Product Info */}
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-lg font-bold text-obsidian mb-2 font-serif">
                  {lang === 'ar' ? product.nameAr : product.nameEn}
                </h3>
                <p className="text-xs text-obsidian/65 mb-4 line-clamp-2">
                  {lang === 'ar' ? product.topNotesAr : product.topNotesEn}
                </p>

                {/* Meter Indicators */}
                <div className="bg-cream-100 p-3 rounded-xl mb-6 space-y-2 border border-gold-500/10">
                  <div className="flex items-center justify-between text-xs font-semibold text-obsidian/70">
                    <span>{t('longevityLabel')}</span>
                    <div className="w-24 h-1.5 bg-cream-300 rounded-full overflow-hidden">
                      <div className="h-full bg-gold-500 rounded-full" style={{ width: `${product.longevity}%` }} />
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs font-semibold text-obsidian/70">
                    <span>{t('projectionLabel')}</span>
                    <div className="w-24 h-1.5 bg-cream-300 rounded-full overflow-hidden">
                      <div className="h-full bg-gold-500 rounded-full" style={{ width: `${product.projection}%` }} />
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 mt-auto">
                  <button
                    onClick={() => onAddToCart(product)}
                    className="flex-1 py-3 px-4 rounded-full bg-gradient-to-r from-gold-600 to-gold-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm hover:shadow-gold-soft transition-all"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>{t('btnAddBag')}</span>
                  </button>

                  <button
                    onClick={() => onQuickView(product)}
                    className="py-3 px-4 rounded-full bg-cream-200 text-obsidian font-bold text-xs hover:bg-gold-500/20 transition-all"
                  >
                    <Eye className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
