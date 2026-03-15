'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import ProductCard from '@/components/ProductCard';
import { products, categories } from '@/lib/products';

export default function ShopPage() {
  const t = useTranslations('shop');
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filtered = activeCategory === 'all'
    ? products
    : products.filter((p) => p.categorySlug === activeCategory);

  return (
    <div className="pt-28 pb-20">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <p className="text-accent text-sm uppercase tracking-[0.3em] mb-4">{t('subtitle')}</p>
          <h1 className="font-serif text-4xl md:text-6xl font-bold">{t('title')}</h1>
        </motion.div>
      </div>

      {/* Category filters */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 mb-12">
        <div className="flex flex-wrap justify-center gap-3">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-5 py-2 text-xs uppercase tracking-wider transition-all duration-300 border ${
              activeCategory === 'all'
                ? 'bg-accent text-primary border-accent'
                : 'bg-transparent text-muted border-offwhite/10 hover:border-accent/50 hover:text-offwhite'
            }`}
          >
            {t('all')} ({products.length})
          </button>
          {categories.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => setActiveCategory(cat.slug)}
              className={`px-5 py-2 text-xs uppercase tracking-wider transition-all duration-300 border ${
                activeCategory === cat.slug
                  ? 'bg-accent text-primary border-accent'
                  : 'bg-transparent text-muted border-offwhite/10 hover:border-accent/50 hover:text-offwhite'
              }`}
            >
              {cat.name} ({cat.count})
            </button>
          ))}
        </div>
      </div>

      {/* Products grid */}
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {filtered.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-muted py-20">{t('noProducts')}</p>
        )}
      </div>
    </div>
  );
}
