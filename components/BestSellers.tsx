'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import ProductCard from './ProductCard';
import { getBestSellers } from '@/lib/products';

export default function BestSellers() {
  const t = useTranslations('home');
  const bestSellers = getBestSellers();

  return (
    <section className="section-padding bg-secondary/30">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-accent text-sm uppercase tracking-[0.3em] mb-4">{t('bestSellersSubtitle')}</p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold">{t('bestSellersTitle')}</h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {bestSellers.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
