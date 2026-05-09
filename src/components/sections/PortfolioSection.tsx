'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { portfolio } from '@/data/portfolio';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Maximize2 } from 'lucide-react';

export function PortfolioSection() {
  return (
    <section id="portfolio" className="py-32 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-pool-500/10 border border-pool-500/20 rounded-full mb-4">
              <Sparkles className="w-3 h-3 text-pool-400" />
              <span className="text-[10px] font-bold text-pool-100 uppercase tracking-[0.2em]">Our Portfolio</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tighter">
              Breathtaking <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pool-400 to-sky-300">Transformations</span>
            </h2>
          </div>
          <p className="text-pool-100/50 max-w-md text-sm leading-relaxed md:text-right">
            Hover over any project to reveal the "Before" state. Witness the precision of Derek's Complete Pool Care.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {portfolio.map((project, index) => (
            <PortfolioCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function PortfolioCard({ project, index }: { project: any, index: number }) {
  const [isHovered, setIsHovered] = useState(false);
  const hasBeforeImage = !!project.beforeImage;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group relative rounded-[2.5rem] overflow-hidden bg-slate-900 border border-white/5 h-[500px]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* After Image (Base) */}
      <div className="absolute inset-0">
        <Image 
          src={project.afterImage} 
          alt={`${project.title} After`}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>

      {/* Before Image (Overlay) */}
      <AnimatePresence>
        {isHovered && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 z-10"
          >
            {hasBeforeImage ? (
              <Image 
                src={project.beforeImage} 
                alt={`${project.title} Before`}
                fill
                className="object-cover"
              />
            ) : (
              /* Grayscale Fallback */
              <Image 
                src={project.afterImage} 
                alt={`${project.title} Before (Grayscale Fallback)`}
                fill
                className="object-cover grayscale brightness-75 blur-[2px]"
              />
            )}
            <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-[1px]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <Badge className="bg-white/20 backdrop-blur-md text-white border-white/30 px-6 py-2 rounded-full text-lg font-bold tracking-widest uppercase">
                BEFORE
              </Badge>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content Overlay */}
      <div className="absolute inset-0 z-20 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent flex flex-col justify-end p-10 pointer-events-none">
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag: string) => (
            <Badge key={tag} className="bg-pool-500/10 text-pool-400 border-none text-[10px] font-bold uppercase">
              {tag}
            </Badge>
          ))}
        </div>
        <h3 className="text-3xl font-bold text-white mb-2 tracking-tight">{project.title}</h3>
        <p className="text-pool-100/60 text-sm line-clamp-2">{project.description}</p>
      </div>

      {/* Interaction Indicator */}
      <div className="absolute top-6 right-6 z-30 pointer-events-none">
        <div className="p-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
          <Maximize2 className="w-5 h-5 text-white/50" />
        </div>
      </div>
    </motion.div>
  );
}
