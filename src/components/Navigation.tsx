'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Droplets, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { contactInfo } from '@/data/business';

const navLinks = [
  { name: 'Services', href: '#services' },
  { name: 'Aboveground', href: '#aboveground' },
  { name: 'Renovations & Repairs', href: '#renovations' },
  { name: 'Gallery', href: '/pool-gallery' },
  { name: 'Testimonials', href: '#testimonials' },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={cn("fixed top-0 left-0 right-0 z-50 transition-all duration-500 py-6", scrolled ? "py-4 bg-slate-950/80 backdrop-blur-md border-b border-white/5" : "py-8")}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group shrink-0">
            <div className="p-2 bg-pool-500 rounded-xl group-hover:rotate-12 transition-transform duration-500 shadow-lg shadow-pool-500/20">
              <Droplets className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl xl:text-2xl font-bold tracking-tighter text-white whitespace-nowrap">
              Derek&apos;s <span className="text-pool-400 hidden xl:inline">Complete</span> Pool Care
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-6 xl:gap-10">
            <div className="flex items-center gap-5 xl:gap-8">
              {navLinks.map((link) => (
                link.href.startsWith('#') ? (
                  <a 
                    key={link.name} 
                    href={link.href} 
                    className="text-[10px] xl:text-[11px] font-bold uppercase tracking-[0.1em] xl:tracking-[0.2em] text-pool-100/70 hover:text-pool-400 transition-colors whitespace-nowrap"
                  >
                    {link.name}
                  </a>
                ) : (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="text-[10px] xl:text-[11px] font-bold uppercase tracking-[0.1em] xl:tracking-[0.2em] text-pool-100/70 hover:text-pool-400 transition-colors whitespace-nowrap"
                  >
                    {link.name}
                  </Link>
                )
              ))}
            </div>
            <div className="flex items-center gap-6 border-l border-white/10 pl-6 xl:pl-10">
              <div className="flex flex-col items-end">
                <a 
                  href={`tel:${contactInfo.phone.replace(/\D/g, '')}`} 
                  className="flex items-center gap-1.5 text-[10px] xl:text-xs font-bold text-pool-400 hover:text-white transition-colors whitespace-nowrap mb-1"
                >
                  <Phone className="h-3 w-3" /> {contactInfo.phone}
                </a>
                <Button asChild className="bg-pool-500 hover:bg-pool-400 text-white rounded-full px-5 xl:px-6 font-bold shadow-lg shadow-pool-500/20 transition-all hover:scale-105 h-9 xl:h-10 text-[10px] xl:text-xs">
                  <a href="#contact">Get a Quote</a>
                </Button>
              </div>
            </div>
          </div>

          <div className="lg:hidden">
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="p-3 rounded-xl bg-white/5 text-white border border-white/10 hover:bg-white/10 transition-colors"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }} 
            animate={{ opacity: 1, height: 'auto' }} 
            exit={{ opacity: 0, height: 0 }} 
            className="lg:hidden bg-slate-900 border-b border-white/10 overflow-hidden"
          >
            <div className="px-4 py-8 space-y-6">
              {navLinks.map((link) => (
                link.href.startsWith('#') ? (
                  <a 
                    key={link.name} 
                    href={link.href} 
                    onClick={() => setIsOpen(false)} 
                    className="block text-2xl font-bold text-white hover:text-pool-400 transition-colors"
                  >
                    {link.name}
                  </a>
                ) : (
                  <Link 
                    key={link.name} 
                    href={link.href} 
                    onClick={() => setIsOpen(false)} 
                    className="block text-2xl font-bold text-white hover:text-pool-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                )
              ))}
              <Button asChild className="w-full bg-pool-500 py-6 text-lg rounded-2xl font-bold">
                <a href="#contact" onClick={() => setIsOpen(false)}>Get a Quote</a>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
