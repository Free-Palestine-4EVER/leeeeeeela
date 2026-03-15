import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  matcher: ['/', '/(bs|en|de|fr|es|it|nl|pl|sv|hr)/:path*'],
};
