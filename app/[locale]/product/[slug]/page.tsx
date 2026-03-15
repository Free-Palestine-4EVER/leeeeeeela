import { setRequestLocale } from 'next-intl/server';
import ProductDetail from './ProductDetail';
import { products } from '@/lib/products';

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string; locale: string }> }) {
  const { slug, locale } = await params;
  setRequestLocale(locale);
  return <ProductDetail slug={slug} />;
}
