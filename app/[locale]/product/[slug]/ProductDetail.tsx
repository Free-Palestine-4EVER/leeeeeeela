'use client';

import { useLocale, useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { getProductBySlug, getProductsByCategory, type Product } from '@/lib/products';
import ProductCard from '@/components/ProductCard';

export default function ProductDetail({ slug }: { slug: string }) {
  const t = useTranslations('product');
  const locale = useLocale();
  const product = getProductBySlug(slug);

  if (!product) {
    return (
      <div className="pt-40 text-center">
        <h1 className="font-serif text-3xl text-offwhite">Product not found</h1>
        <Link href={`/${locale}/shop`} className="btn-outline inline-block mt-6">{t('backToShop')}</Link>
      </div>
    );
  }

  const related = getProductsByCategory(product.categorySlug)
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="pt-28 pb-20">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 mb-8">
        <div className="flex items-center gap-2 text-sm text-muted">
          <Link href={`/${locale}/shop`} className="hover:text-accent transition-colors">{t('backToShop')}</Link>
          <span>/</span>
          <span className="text-offwhite/60">{product.category}</span>
        </div>
      </div>

      {/* Product */}
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Image gallery */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="aspect-square rounded-xl overflow-hidden bg-secondary glass-card">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col justify-center"
          >
            <p className="text-accent text-sm uppercase tracking-[0.2em] mb-3">{product.category}</p>
            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold mb-6">{product.name}</h1>

            {/* Price */}
            <div className="mb-8">
              {product.price ? (
                <div className="flex items-center gap-4">
                  {product.salePrice ? (
                    <>
                      <span className="font-serif text-3xl font-bold text-accent">KM {product.salePrice}</span>
                      <span className="text-muted line-through text-xl">KM {product.price}</span>
                      <span className="bg-accent/20 text-accent text-xs font-bold px-2 py-1 uppercase">
                        -{Math.round(((product.price - product.salePrice) / product.price) * 100)}%
                      </span>
                    </>
                  ) : (
                    <span className="font-serif text-3xl font-bold text-accent">KM {product.price}</span>
                  )}
                </div>
              ) : (
                <p className="text-muted italic">{t('contactForPrice')}</p>
              )}
            </div>

            {/* Description */}
            <p className="text-muted leading-relaxed mb-8">{product.description}</p>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="glass-card p-4 text-center">
                <p className="text-accent text-xs uppercase tracking-wider mb-1">{t('quality')}</p>
                <p className="text-offwhite text-sm font-medium">Premium</p>
              </div>
              <div className="glass-card p-4 text-center">
                <p className="text-accent text-xs uppercase tracking-wider mb-1">{t('shipping')}</p>
                <p className="text-offwhite text-sm font-medium">BiH & EU</p>
              </div>
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="https://wa.me/38761000000"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold text-center flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                {t('orderWhatsApp')}
              </a>
              <Link href={`/${locale}/contact`} className="btn-outline text-center">
                {t('contactUs')}
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <div className="mt-24">
            <h2 className="font-serif text-3xl font-bold mb-8 text-center">{t('relatedProducts')}</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {related.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
