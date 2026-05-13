import { HeroSection } from '@/components/sections/HeroSection';
import { AuthoritySection } from '@/components/sections/AuthoritySection';
import { PromotionSection } from '@/components/sections/PromotionSection';
import { PortfolioGallery } from '@/components/PortfolioGallery';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';
import { services } from '@/data/services';

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950">
      {/* Hero: Focal Point */}
      <HeroSection />

      {/* Summary: Authority & Trust */}
      <section className="py-24 bg-slate-900/50">
        <AuthoritySection />
      </section>

      {/* Summary: Service Categories Preview */}
      <section className="py-32 container mx-auto max-w-7xl px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-pool-500/10 border border-pool-500/20 px-4 py-2 rounded-full mb-6">
              <Sparkles className="w-4 h-4 text-pool-400" />
              <span className="text-xs font-bold text-pool-100 tracking-widest uppercase">Expert Solutions</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tighter mb-6">
              Long Island&apos;s Gold Standard in <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pool-400 to-sky-300">Pool Luxury</span>
            </h2>
          </div>
          <Button asChild variant="outline" className="rounded-full border-pool-500/30 text-pool-100 h-14 px-8 font-bold hover:bg-pool-500/10">
            <Link href="/services">View All Services <ArrowRight className="ml-2 w-5 h-5" /></Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.slice(0, 4).map((service) => (
            <Link 
              key={service.id} 
              href={`/services/${service.id}`}
              className="p-8 glass-dark border border-white/5 rounded-3xl hover:border-pool-500/30 transition-all group"
            >
              <h4 className="text-xl font-bold text-white group-hover:text-pool-400 transition-colors mb-2">{service.title}</h4>
              <p className="text-sm text-pool-100/60 line-clamp-2 mb-6">{service.description}</p>
              <div className="text-pool-400 text-xs font-bold uppercase tracking-widest flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Explore <ArrowRight className="w-3 h-3" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Summary: Active Promotions */}
      <PromotionSection />

      {/* Summary: Portfolio Peek */}
      <section className="py-32 bg-slate-950">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold text-pool-400 uppercase tracking-[0.3em] mb-4">Visual Proof</h2>
            <p className="text-4xl md:text-5xl font-bold text-white tracking-tighter mb-6">
              Transformation <span className="text-transparent bg-clip-text bg-gradient-to-r from-pool-400 to-pool-600">Gallery</span>
            </p>
            <div className="w-24 h-1 bg-pool-500 mx-auto rounded-full" />
          </div>
          <PortfolioGallery />
        </div>
      </section>

      {/* Global Bottom CTA: Lead Magnet */}
      <section className="py-32 border-t border-white/5 bg-[radial-gradient(circle_at_50%_100%,#0c4a6e,transparent_50%)]">
        <div className="container mx-auto max-w-3xl px-4 text-center">
          <h2 className="text-5xl md:text-6xl font-bold text-white tracking-tighter mb-8">
            Ready to Start Your Pool <span className="text-pool-400">Transformation?</span>
          </h2>
          <p className="text-pool-100/60 text-xl mb-12">
            Whether it&apos;s a weekly plan or a full equipment overhaul, Derek is ready to elevate your backyard luxury.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-pool-500 hover:bg-pool-400 text-white h-16 px-12 rounded-full text-xl font-bold shadow-xl shadow-pool-500/20 transition-all hover:scale-105 active:scale-95">
              <Link href="/contact">Get a Free Quote</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-16 px-12 rounded-full text-xl font-bold border-white/10 hover:bg-white/5">
              <Link href="/services">Our Process</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
