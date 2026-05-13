import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft, CheckCircle2, Phone, ArrowRight, LucideIcon, Droplets, Sun, Wrench, Layers, ShieldCheck, Search, Moon, ShoppingCart, Tag, Hammer, Waves } from 'lucide-react';
import { services } from '@/data/services';
import { contactInfo } from '@/data/business';
import { Button } from '@/components/ui/button';

const iconMap: Record<string, LucideIcon> = {
  Droplets, Sun, Wrench, Layers, ShieldCheck, Search, Moon, ShoppingCart, Tag, Hammer, Waves
};

interface ServicePageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Generate static params for better performance
export async function generateStaticParams() {
  return services.map((service) => ({
    slug: service.id,
  }));
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = services.find(s => s.id === slug);

  if (!service) {
    notFound();
  }

  const Icon = iconMap[service.icon as keyof typeof iconMap] || Wrench;

  return (
    <main className="min-h-screen bg-slate-950 pt-32 pb-24">
      <div className="container mx-auto max-w-7xl px-4">
        {/* Breadcrumbs */}
        <Link 
          href="/services" 
          className="inline-flex items-center gap-2 text-pool-400 hover:text-pool-300 font-bold mb-12 group transition-colors"
        >
          <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" /> 
          Back to All Services
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Main Content */}
          <div className="lg:col-span-7">
            <div className="w-20 h-20 rounded-3xl bg-pool-500/10 flex items-center justify-center mb-8 border border-pool-500/20">
              <Icon className="w-10 h-10 text-pool-400" />
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-white tracking-tighter mb-6">
              {service.title}
            </h1>
            
            <p className="text-xl text-pool-100/80 leading-relaxed mb-8">
              {service.longDescription || service.description}
            </p>

            {/* Features List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-12">
              {service.features.map((feature, idx) => (
                <div key={idx} className="flex items-center gap-3 p-4 glass-dark border border-white/5 rounded-2xl">
                  <CheckCircle2 className="w-5 h-5 text-pool-400 shrink-0" />
                  <span className="text-white font-medium">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar Sidebar/CTA */}
          <div className="lg:col-span-5">
            <div className="sticky top-32">
              <div className="glass-dark border border-white/5 p-8 md:p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-pool-500/10 blur-3xl rounded-full -mr-16 -mt-16" />
                
                <h3 className="text-2xl font-bold text-white mb-6">Ready to Get Started?</h3>
                <p className="text-pool-100/60 mb-8">
                  Get a free, no-obligation quote for your {service.title} project. Derek will personally review your request.
                </p>

                <div className="space-y-4 mb-10">
                  <Button asChild size="lg" className="w-full bg-pool-500 hover:bg-pool-400 text-white h-16 text-lg font-bold rounded-2xl shadow-lg shadow-pool-500/20 transition-all hover:scale-[1.02] active:scale-95">
                    <Link href="/contact" className="flex items-center justify-center gap-2">
                      Get a Free Quote <ArrowRight className="w-5 h-5" />
                    </Link>
                  </Button>
                  
                  <div className="text-center py-4">
                    <p className="text-pool-100/40 text-sm uppercase tracking-widest mb-2">Or Call Directly</p>
                    <a 
                      href={`tel:${contactInfo.phone.replace(/\D/g, '')}`} 
                      className="text-3xl font-bold text-white flex items-center justify-center gap-3 hover:text-pool-400 transition-colors"
                    >
                      <Phone className="w-7 h-7 text-pool-400" />
                      {contactInfo.phone}
                    </a>
                  </div>
                </div>

                <div className="pt-8 border-t border-white/10 text-center">
                  <p className="text-pool-100/50 text-sm">
                    Verified 5.0 Google Rating <br />
                    15+ Years Professional Experience
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Prevent Dead End: Related Services */}
        <div className="mt-40 border-t border-white/5 pt-20">
           <h2 className="text-3xl font-bold text-white mb-12">Other Services You Might Need</h2>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             {services
                .filter(s => s.id !== service.id)
                .slice(0, 3)
                .map(other => (
                  <Link 
                    key={other.id} 
                    href={`/services/${other.id}`}
                    className="p-6 glass-dark border border-white/5 rounded-2xl hover:border-pool-500/30 transition-all group"
                  >
                    <h4 className="text-lg font-bold text-white group-hover:text-pool-400 transition-colors mb-2">{other.title}</h4>
                    <p className="text-sm text-pool-100/60 line-clamp-2">{other.description}</p>
                  </Link>
                ))
             }
           </div>
        </div>
      </div>
    </main>
  );
}
