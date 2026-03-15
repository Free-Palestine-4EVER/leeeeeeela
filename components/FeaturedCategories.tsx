'use client';

import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { categories } from '@/lib/products';

const categoryImages: Record<string, string> = {
  'toperi': '/images/topper-ombre-blonde.jpg',
  'repovi-ravni': '/images/rep-ash-blonde-ravni.png',
  'repovi-kovrdzavi': '/images/rep-piano-kovrdjavi.png',
  'repovi-uvijeni': '/images/rep-613-uvijeni.png',
  'repovi-premium': '/images/rep-platinum-85.png',
  'perike-prirodna-kosa': '/images/perika-platinum-valovita.jpg',
  'perike-proteinsko-vlakno': '/images/perika-pv-balayage.jpg',
  'ekstenzije': '/images/ext-tape-in.jpg',
  'ekstenzije-klipse': '/images/klipse-crna.jpg',
  'siskice': '/images/siskice-prirodna.webp',
};

const featuredCategories = [
  'perike-prirodna-kosa',
  'repovi-ravni',
  'toperi',
  'ekstenzije',
  'perike-proteinsko-vlakno',
  'repovi-kovrdzavi',
];

export default function FeaturedCategories() {
  const t = useTranslations('home');
  const locale = useLocale();

  const featured = categories.filter(c => featuredCategories.includes(c.slug));

  return (
    <section className="section-padding">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-accent text-sm uppercase tracking-[0.3em] mb-4">{t('categoriesSubtitle')}</p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold">{t('categoriesTitle')}</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((cat, i) => (
            <motion.div
              key={cat.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <Link href={`/${locale}/category/${cat.slug}`} className="group block relative overflow-hidden rounded-xl aspect-[4/3]">
                <img
                  src={categoryImages[cat.slug] || '/images/perika-balayage-ash.jpg'}
                  alt={cat.nameEn}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="font-serif text-xl md:text-2xl font-semibold text-offwhite group-hover:text-accent transition-colors duration-300">
                    {cat.name}
                  </h3>
                  <p className="text-muted text-sm mt-1">{cat.count} {t('products')}</p>
                </div>
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-accent/30 rounded-xl transition-colors duration-500" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
