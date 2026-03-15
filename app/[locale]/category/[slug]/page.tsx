import { setRequestLocale } from 'next-intl/server';
import CategoryPage from './CategoryPage';
import { categories } from '@/lib/products';

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export default async function Page({ params }: { params: Promise<{ slug: string; locale: string }> }) {
  const { slug, locale } = await params;
  setRequestLocale(locale);
  return <CategoryPage slug={slug} />;
}
