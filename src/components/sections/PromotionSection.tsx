'use client';

import { motion } from 'framer-motion';
import { currentSales } from '@/data/business';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Clock, Zap, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export function PromotionSection() {
  if (currentSales.length === 0) return null;

  return (
    <section className="py-24 bg-slate-950 relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-pool-500/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-sky-500/10 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-yellow-500/10 border border-yellow-500/20 px-4 py-2 rounded-full mb-6"
          >
            <Zap className="w-4 h-4 text-yellow-500" />
            <span className="text-xs font-bold text-yellow-200 tracking-[0.2em] uppercase">Limited Time Offers</span>
          </motion.div>
          <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tighter mb-6">
            Exclusive <span className="text-transparent bg-clip-text bg-gradient-to-r from-pool-400 to-sky-400">Seasonal Savings</span>
          </h2>
          <div className="w-24 h-1.5 bg-pool-500 mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {currentSales.map((sale, index) => (
            <motion.div
              key={sale.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="relative group"
            >
              <div className={cn(
                "h-full p-8 md:p-12 rounded-[2.5rem] border border-white/5 bg-slate-900/50 backdrop-blur-xl relative overflow-hidden transition-all duration-500 hover:border-pool-500/30 hover:shadow-2xl hover:shadow-pool-500/10",
                index === 0 ? "border-pool-500/20" : "border-sky-500/20"
              )}>
                {/* Sale Badge */}
                <div className={cn(
                  "absolute top-6 right-6 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg",
                  index === 0 ? "bg-pool-500 text-white" : "bg-sky-500 text-white"
                )}>
                  {sale.badge}
                </div>

                <div className="relative z-10">
                  <span className="text-sm font-bold text-pool-400 uppercase tracking-widest block mb-4">
                    {sale.category}
                  </span>
                  <h3 className="text-3xl md:text-4xl font-bold text-white mb-2 tracking-tight group-hover:text-pool-300 transition-colors">
                    {sale.title}
                  </h3>
                  <p className="text-lg text-pool-100/60 mb-6 font-medium">
                    {sale.subtitle}
                  </p>

                  <div className="p-6 rounded-2xl bg-white/5 border border-white/10 mb-8">
                    <p className="text-xl md:text-2xl font-bold text-white mb-4 flex items-center gap-3">
                      <span className="text-yellow-400 leading-tight">{sale.description}</span>
                    </p>
                    <ul className="space-y-3">
                      {sale.details.map((detail, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-sm text-pool-100/70">
                          <CheckCircle2 className="w-5 h-5 text-pool-400 shrink-0 mt-0.5" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-6 border-t border-white/5">
                    <div className="flex items-center gap-3 text-pool-100/50">
                      <Clock className="w-5 h-5 text-pool-500" />
                      <span className="text-sm font-bold uppercase tracking-widest">
                        Ends {sale.endDate}
                      </span>
                    </div>
                    <Button asChild className={cn(
                      "w-full sm:w-auto h-14 px-8 rounded-full font-bold transition-all hover:scale-105",
                      index === 0 ? "bg-pool-500 hover:bg-pool-400" : "bg-sky-500 hover:bg-sky-400"
                    )}>
                      <a href="#contact" className="flex items-center gap-2">
                        Claim Discount <ArrowRight className="w-5 h-5" />
                      </a>
                    </Button>
                  </div>
                </div>

                {/* Decorative gradients */}
                <div className={cn(
                  "absolute -bottom-24 -right-24 w-64 h-64 blur-[100px] opacity-20 rounded-full",
                  index === 0 ? "bg-pool-500" : "bg-sky-500"
                )} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
