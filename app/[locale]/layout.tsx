import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import '../globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import Chatbot from '@/components/Chatbot';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const metadata = {
  title: 'Eynna Hair Sarajevo | Premium Hair & Beauty',
  description: 'Luxury wigs, extensions, ponytails & hair accessories. Premium quality hair products in Sarajevo, Bosnia & Herzegovina.',
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as typeof routing.locales[number])) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <Navbar locale={locale} />
      <main className="min-h-screen bg-primary text-offwhite font-sans antialiased">{children}</main>
      <Footer />
      <Chatbot />
      <WhatsAppFloat />
    </NextIntlClientProvider>
  );
}
