'use client';

import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BentoGridItemProps {
  title: string;
  description: string;
  icon: LucideIcon;
  className?: string;
  delay?: number;
}

export function BentoGridItem({ title, description, icon: Icon, className, delay = 0 }: BentoGridItemProps) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay }} className={cn("group relative overflow-hidden rounded-[32px] p-8 transition-all duration-500 bg-white border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-pool-500/10 hover:-translate-y-1", className)}>
      <div className="absolute inset-0 bg-gradient-to-br from-pool-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative z-10">
        <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-pool-50 text-pool-600 transition-colors duration-500 group-hover:bg-pool-600 group-hover:text-white"><Icon className="h-6 w-6" /></div>
        <h3 className="mb-3 text-2xl font-bold tracking-tight text-slate-900">{title}</h3>
        <p className="text-slate-600 leading-relaxed">{description}</p>
      </div>
      <div className="absolute bottom-8 right-8 translate-x-4 opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100">
        <div className="h-10 w-10 rounded-full border border-pool-100 flex items-center justify-center text-pool-600">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
        </div>
      </div>
    </motion.div>
  );
}

export function BentoGrid({ children, className }: { children: React.ReactNode, className?: string }) {
  return <div className={cn("grid grid-cols-1 md:grid-cols-3 gap-6", className)}>{children}</div>;
}
