import { Navigation } from '@/components/Navigation';
import { HeroSection } from '@/components/sections/HeroSection';
import { AuthoritySection } from '@/components/sections/AuthoritySection';
import { ServicesSection } from '@/components/sections/ServicesSection';
import { AbovegroundSection } from '@/components/sections/AbovegroundSection';
import { RenovationsSection } from '@/components/sections/RenovationsSection';
import { PortfolioGallery } from '@/components/PortfolioGallery';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { ContactSection } from '@/components/sections/ContactSection';
import { Footer } from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950">
      <Navigation />
      <HeroSection />
      
      <section id="authority">
        <AuthoritySection />
      </section>

      <section id="services">
        <ServicesSection />
      </section>

      <section id="aboveground">
        <AbovegroundSection />
      </section>

      <section id="renovations">
        <RenovationsSection />
      </section>

      <section id="portfolio" className="py-32 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold text-pool-400 uppercase tracking-[0.3em] mb-4">Our Work</h2>
            <p className="text-4xl md:text-5xl font-bold text-white tracking-tighter mb-6">
              Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-pool-400 to-pool-600">Projects</span>
            </p>
            <div className="w-24 h-1 bg-pool-500 mx-auto rounded-full" />
          </div>
          <PortfolioGallery />
        </div>
      </section>

      <section id="testimonials">
        <TestimonialsSection />
      </section>

      <section id="contact">
        <ContactSection />
      </section>

      <Footer />
    </main>
  );
}
