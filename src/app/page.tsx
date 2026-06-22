import Nav from '@/components/layout/Nav';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Features from '@/components/sections/Features';
import NetworkMap from '@/components/sections/NetworkMap';
import TechStack from '@/components/sections/TechStack';
import Integrations from '@/components/sections/Integrations';
import Testimonials from '@/components/sections/Testimonials';
import CTA from '@/components/sections/CTA';

export default function Home() {
  return (
    <div className="bg-bg min-h-screen transition-colors duration-300">
      <Nav />
      <main>
        <Hero />
        <About />
        <Features />
        <NetworkMap />
        <TechStack />
        <Integrations />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
