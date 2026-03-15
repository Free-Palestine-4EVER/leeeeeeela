'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

export default function AboutPage() {
  const t = useTranslations('about');

  return (
    <div className="pt-28 pb-20">
      {/* Hero */}
      <div className="relative h-[50vh] flex items-center justify-center overflow-hidden mb-20">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/60 via-primary/50 to-primary z-10" />
          <img src="/images/perika-platinum-valovita.jpg" alt="About Eynna Hair" className="w-full h-full object-cover" />
        </div>
        <div className="relative z-20 text-center px-4">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-accent text-sm uppercase tracking-[0.3em] mb-4"
          >
            {t('subtitle')}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-serif text-5xl md:text-7xl font-bold"
          >
            {t('title')}
          </motion.h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 md:px-8">
        {/* Story */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6 gold-gradient inline-block">{t('storyTitle')}</h2>
          <p className="text-muted leading-relaxed text-lg mb-6">{t('storyText1')}</p>
          <p className="text-muted leading-relaxed text-lg">{t('storyText2')}</p>
        </motion.div>

        {/* Quality */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6 gold-gradient inline-block">{t('qualityTitle')}</h2>
          <p className="text-muted leading-relaxed text-lg mb-6">{t('qualityText1')}</p>
          <p className="text-muted leading-relaxed text-lg">{t('qualityText2')}</p>
        </motion.div>

        {/* Values */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {['value1', 'value2', 'value3'].map((key, i) => (
              <div key={key} className="glass-card p-8 text-center">
                <div className="w-12 h-12 mx-auto mb-4 border border-accent/30 rounded-full flex items-center justify-center">
                  <span className="text-accent font-serif text-xl font-bold">{i + 1}</span>
                </div>
                <h3 className="font-serif text-xl font-semibold text-accent mb-3">{t(`${key}Title`)}</h3>
                <p className="text-muted text-sm leading-relaxed">{t(`${key}Text`)}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
