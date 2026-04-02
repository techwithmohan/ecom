import Hero from '@/components/home/Hero';
import CategorySection from '@/components/home/CategorySection';
import BestSellers from '@/components/home/BestSellers';
import NewArrivals from '@/components/home/NewArrivals';
import OfferSection from '@/components/home/OfferSection';
import BrandStory from '@/components/home/BrandStory';
import TrustSection from '@/components/home/TrustSection';

export default function Home() {
  return (
    <main className="overflow-x-hidden">
      <Hero />
      <div className="space-y-0 animate-fade-in">
        <TrustSection />
        <CategorySection />
        <BestSellers />
        <OfferSection />
        <NewArrivals />
        <BrandStory />
      </div>
    </main>
  );
}
