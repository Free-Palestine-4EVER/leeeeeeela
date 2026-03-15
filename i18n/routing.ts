import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['bs', 'en', 'de', 'fr', 'es', 'it', 'nl', 'pl', 'sv', 'hr'],
  defaultLocale: 'bs',
});
