'use client';

import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

export default function AboutTeaser() {
  const t = useTranslations('home');
  const locale = useLocale();

  return (
    <section className="section-padding">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-[3/4] rounded-xl overflow-hidden">
              <img
                src="/images/perika-valovita-balayage.jpg"
                alt="Eynna Hair Premium Quality"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 border-2 border-accent/30 rounded-xl" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="text-accent text-sm uppercase tracking-[0.3em] mb-4">{t('aboutSubtitle')}</p>
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">{t('aboutTitle')}</h2>
            <p className="text-muted leading-relaxed mb-6">{t('aboutText1')}</p>
            <p className="text-muted leading-relaxed mb-8">{t('aboutText2')}</p>

            <div className="grid grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <p className="font-serif text-3xl font-bold text-accent">50+</p>
                <p className="text-muted text-sm mt-1">{t('aboutProducts')}</p>
              </div>
              <div className="text-center">
                <p className="font-serif text-3xl font-bold text-accent">100%</p>
                <p className="text-muted text-sm mt-1">{t('aboutQuality')}</p>
              </div>
              <div className="text-center">
                <p className="font-serif text-3xl font-bold text-accent">10+</p>
                <p className="text-muted text-sm mt-1">{t('aboutLanguages')}</p>
              </div>
            </div>

            <Link href={`/${locale}/about`} className="btn-outline inline-block">
              {t('learnMore')}
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
