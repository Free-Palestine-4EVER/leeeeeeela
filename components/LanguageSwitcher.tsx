'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

const languages = [
  { code: 'bs', label: 'BS' },
  { code: 'en', label: 'EN' },
  { code: 'de', label: 'DE' },
  { code: 'fr', label: 'FR' },
  { code: 'es', label: 'ES' },
  { code: 'it', label: 'IT' },
  { code: 'nl', label: 'NL' },
  { code: 'pl', label: 'PL' },
  { code: 'sv', label: 'SV' },
  { code: 'hr', label: 'HR' },
];

export default function LanguageSwitcher({ locale }: { locale: string }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const switchLocale = (newLocale: string) => {
    const segments = pathname.split('/');
    segments[1] = newLocale;
    return segments.join('/');
  };

  const current = languages.find((l) => l.code === locale) || languages[0];

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 text-sm uppercase tracking-wider text-offwhite/80 hover:text-accent transition-colors border border-offwhite/20 px-3 py-1.5 rounded"
      >
        {current.label}
        <svg className={`w-3 h-3 transition-transform ${open ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute right-0 top-full mt-2 bg-secondary border border-offwhite/10 rounded-lg overflow-hidden shadow-xl z-50 min-w-[80px]"
          >
            {languages.map((lang) => (
              <Link
                key={lang.code}
                href={switchLocale(lang.code)}
                onClick={() => setOpen(false)}
                className={`block px-4 py-2 text-sm hover:bg-accent/20 transition-colors ${
                  lang.code === locale ? 'text-accent bg-accent/10' : 'text-offwhite/80'
                }`}
              >
                {lang.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
