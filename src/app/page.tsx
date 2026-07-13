import type { Metadata } from 'next';
import Nav from '@/components/layout/Nav';
import Footer from '@/components/layout/Footer';
import JsonLd from '@/components/seo/JsonLd';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Features from '@/components/sections/Features';
import NetworkMap from '@/components/sections/NetworkMap';
import PopularLinks from '@/components/sections/PopularLinks';
import IndianMetroSystems from '@/components/sections/IndianMetroSystems';
import LatestMetroNews from '@/components/sections/LatestMetroNews';
import TechStack from '@/components/sections/TechStack';
import Integrations from '@/components/sections/Integrations';
import Testimonials from '@/components/sections/Testimonials';
import CTA from '@/components/sections/CTA';
import { SITE_URL } from '@/lib/seo/config';

export const metadata: Metadata = {
  alternates: { canonical: SITE_URL },
};

const appJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'lyne.',
  applicationCategory: 'TravelApplication',
  operatingSystem: 'Android, iOS',
  description: 'Delhi Metro route planner, fare calculator, and live journey tracker covering all 10 lines and 263 stations.',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
};

export default function Home() {
  return (
    <div className="bg-bg min-h-screen transition-colors duration-300">
      <Nav />
      <JsonLd data={appJsonLd} />
      <main>
        <Hero />
        <About />
        <Features />
        <NetworkMap />
        <PopularLinks />
        <IndianMetroSystems />
        <LatestMetroNews />
        <TechStack />
        <Integrations />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
