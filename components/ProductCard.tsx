'use client';

import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import type { Product } from '@/lib/products';

export default function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const locale = useLocale();
  const t = useTranslations('product');

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
    >
      <Link href={`/${locale}/product/${product.slug}`} className="group block">
        <div className="glass-card overflow-hidden transition-all duration-500 hover:border-accent/30 hover:shadow-[0_0_30px_rgba(201,169,110,0.15)]">
          {/* Image */}
          <div className="relative aspect-square overflow-hidden bg-secondary">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              loading="lazy"
            />
            {product.salePrice && (
              <div className="absolute top-3 right-3 bg-accent text-primary text-xs font-bold px-2 py-1 uppercase tracking-wider">
                Sale
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>

          {/* Info */}
          <div className="p-4">
            <h3 className="font-serif text-sm md:text-base font-medium text-offwhite group-hover:text-accent transition-colors duration-300 line-clamp-2 mb-2">
              {product.name}
            </h3>
            <div className="flex items-center gap-2">
              {product.price ? (
                <>
                  {product.salePrice ? (
                    <>
                      <span className="text-accent font-semibold text-sm">KM {product.salePrice}</span>
                      <span className="text-muted line-through text-xs">KM {product.price}</span>
                    </>
                  ) : (
                    <span className="text-accent font-semibold text-sm">KM {product.price}</span>
                  )}
                </>
              ) : (
                <span className="text-muted text-xs italic">{t('contactForPrice')}</span>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
