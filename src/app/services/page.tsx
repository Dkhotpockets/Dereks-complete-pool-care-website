import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { services } from '@/data/services';
import { Button } from '@/components/ui/button';
import { LucideIcon, Droplets, Sun, Wrench, Layers, ShieldCheck, Search, Moon, ShoppingCart, Tag, Hammer, Waves } from 'lucide-react';

export const metadata: Metadata = {
  title: "Services | Derek's Complete Pool Care",
  description: "Comprehensive pool maintenance, repair, and transformation services in Long Island.",
};

const iconMap: Record<string, LucideIcon> = {
  Droplets, Sun, Wrench, Layers, ShieldCheck, Search, Moon, ShoppingCart, Tag, Hammer, Waves
};

export default function ServicesHubPage() {
  return (
    <main className="min-h-screen bg-slate-950 pt-32 pb-24">
      <div className="container mx-auto max-w-7xl px-4">
        {/* Header */}
        <div className="mb-20 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-pool-500/10 border border-pool-500/20 px-4 py-2 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-pool-400" />
            <span className="text-xs font-bold text-pool-100 tracking-widest uppercase">Expert Solutions</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tighter mb-6">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-pool-400 to-sky-300">Services</span>
          </h1>
          <p className="text-pool-100/60 text-lg">
            From holistic natural maintenance to high-tech leak detection and luxury transformations, we provide the gold standard for your Long Island pool.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => {
            const Icon = iconMap[service.icon as keyof typeof iconMap] || Wrench;
            return (
              <Link 
                key={service.id} 
                href={`/services/${service.id}`}
                className="group relative glass-dark border border-white/5 p-8 rounded-[2rem] hover:border-pool-500/30 transition-all duration-500 flex flex-col h-full"
              >
                <div className="w-14 h-14 rounded-2xl bg-pool-500/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-pool-500/20 transition-all duration-500">
                  <Icon className="w-7 h-7 text-pool-400" />
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-pool-400 transition-colors">
                  {service.title}
                </h3>
                
                <p className="text-pool-100/60 mb-8 flex-grow">
                  {service.description}
                </p>

                <div className="flex items-center gap-2 text-pool-400 font-bold text-sm uppercase tracking-widest group-hover:translate-x-2 transition-transform">
                  View Details <ArrowRight className="w-4 h-4" />
                </div>

                {service.isPremium && (
                  <div className="absolute top-6 right-6">
                    <span className="text-[10px] font-bold text-pool-400 uppercase tracking-widest bg-pool-500/10 px-2 py-1 rounded-md border border-pool-500/20">
                      Premium
                    </span>
                  </div>
                )}
              </Link>
            );
          })}
        </div>

        {/* Global CTA */}
        <div className="mt-32 p-12 glass-dark rounded-[3rem] border border-white/5 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,#0ea5e9,transparent_70%)] opacity-10" />
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Experience the Gold Standard?</h2>
          <p className="text-pool-100/60 mb-10 max-w-2xl mx-auto text-lg">
            Join thousands of Long Island families who trust Derek for their backyard luxury.
          </p>
          <Button asChild size="lg" className="bg-pool-500 hover:bg-pool-400 text-white rounded-full px-12 h-16 text-lg font-bold shadow-xl shadow-pool-500/20">
            <Link href="/contact">Get a Free Quote</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
