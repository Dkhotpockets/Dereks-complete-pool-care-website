'use client';

import { Navigation } from '@/components/Navigation';
import { HeroSection } from '@/components/sections/HeroSection';
import { ServicesSection } from '@/components/sections/ServicesSection';
import { PortfolioGallery } from '@/components/PortfolioGallery';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { AboutSection } from '@/components/sections/AboutSection';
import { ContactForm } from '@/components/ContactForm';
import { GoogleMapEmbed } from '@/components/GoogleMapEmbed';
import { Footer } from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      <main>
        <HeroSection />
        <ServicesSection />
        <AboutSection />
        <PortfolioGallery />
        <TestimonialsSection />

        {/* Contact Section */}
        <section id="contact" className="py-20 bg-pool-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-pool-900 mb-4">Get Your Free Quote</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Ready to experience 5-star pool service? Contact us today for a free, no-obligation quote.
                We typically respond within 24 hours.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <ContactForm />
              <GoogleMapEmbed />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
