import { setRequestLocale } from 'next-intl/server';
import HeroSection from '@/components/HeroSection';
import MarqueeTicker from '@/components/MarqueeTicker';
import FeaturedCategories from '@/components/FeaturedCategories';
import BestSellers from '@/components/BestSellers';
import AboutTeaser from '@/components/AboutTeaser';
import Testimonials from '@/components/Testimonials';
import ScrollAnimations from '@/components/ScrollAnimations';

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <ScrollAnimations />
      <HeroSection />
      <MarqueeTicker />
      <FeaturedCategories />
      <BestSellers />
      <AboutTeaser />
      <Testimonials />
    </>
  );
}
