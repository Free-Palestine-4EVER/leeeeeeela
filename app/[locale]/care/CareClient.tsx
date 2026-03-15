'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

export default function CarePage() {
  const t = useTranslations('care');

  const tips = ['tip1', 'tip2', 'tip3', 'tip4', 'tip5', 'tip6'] as const;

  return (
    <div className="pt-28 pb-20">
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-accent text-sm uppercase tracking-[0.3em] mb-4">{t('subtitle')}</p>
          <h1 className="font-serif text-4xl md:text-6xl font-bold mb-6">{t('title')}</h1>
          <p className="text-muted text-lg">{t('description')}</p>
        </motion.div>

        <div className="space-y-6">
          {tips.map((key, i) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="glass-card p-8"
            >
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0 w-12 h-12 border border-accent/30 rounded-full flex items-center justify-center">
                  <span className="text-accent font-serif text-lg font-bold">{i + 1}</span>
                </div>
                <div>
                  <h3 className="font-serif text-xl font-semibold text-accent mb-3">{t(`${key}Title`)}</h3>
                  <p className="text-muted leading-relaxed">{t(`${key}Text`)}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
