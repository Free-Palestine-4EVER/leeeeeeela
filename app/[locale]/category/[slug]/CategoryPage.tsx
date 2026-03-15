'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import ProductCard from '@/components/ProductCard';
import { getProductsByCategory, categories } from '@/lib/products';

export default function CategoryPage({ slug }: { slug: string }) {
  const t = useTranslations('shop');
  const locale = useLocale();
  const category = categories.find((c) => c.slug === slug);
  const categoryProducts = getProductsByCategory(slug);

  if (!category) {
    return (
      <div className="pt-40 text-center">
        <h1 className="font-serif text-3xl">Category not found</h1>
        <Link href={`/${locale}/shop`} className="btn-outline inline-block mt-6">{t('backToShop')}</Link>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted mb-8">
          <Link href={`/${locale}/shop`} className="hover:text-accent transition-colors">{t('backToShop')}</Link>
          <span>/</span>
          <span className="text-offwhite/60">{category.name}</span>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-accent text-sm uppercase tracking-[0.3em] mb-4">{category.nameEn}</p>
          <h1 className="font-serif text-4xl md:text-6xl font-bold">{category.name}</h1>
          <p className="text-muted mt-4">{categoryProducts.length} {t('productsCount')}</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {categoryProducts.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
