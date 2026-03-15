import { setRequestLocale } from 'next-intl/server';
import CarePage from './CareClient';

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <CarePage />;
}
