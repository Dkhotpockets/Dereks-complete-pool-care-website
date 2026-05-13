'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Droplets, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { contactInfo } from '@/data/business';
import { AnnouncementBar } from '@/components/AnnouncementBar';

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
    <header className="fixed top-0 left-0 right-0 z-50">
      <AnnouncementBar />
      <nav className={cn("transition-all duration-500 py-6", scrolled ? "py-4 bg-slate-950/80 backdrop-blur-md border-b border-white/5" : "py-8")}>
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

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-10">
            <div className="flex items-center gap-5 xl:gap-8">
              {navLinks.map((link) => (
                link.href.startsWith('#') ? (
                  <a 
                    key={link.name} 
                    href={link.href} 
                    className="text-[10px] xl:text-[11px] font-bold uppercase tracking-[0.1em] xl:tracking-[0.2em] text-pool-100/70 hover:text-pool-400 transition-colors whitespace-nowrap min-h-[48px] flex items-center"
                  >
                    {link.name}
                  </a>
                ) : (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="text-[10px] xl:text-[11px] font-bold uppercase tracking-[0.1em] xl:tracking-[0.2em] text-pool-100/70 hover:text-pool-400 transition-colors whitespace-nowrap min-h-[48px] flex items-center"
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
                <Button asChild className="bg-pool-500 hover:bg-pool-400 text-white rounded-full px-5 xl:px-6 font-bold shadow-lg shadow-pool-500/20 transition-all hover:scale-105 h-9 xl:h-10 text-[10px] xl:text-xs min-h-[48px]">
                  <a href="#contact">Get a Quote</a>
                </Button>
              </div>
            </div>
          </div>

          {/* Mobile Hamburger - Bottom Right for Ergonomics */}
          <div className="lg:hidden fixed bottom-24 right-6 z-50">
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="w-14 h-14 rounded-full bg-pool-500 text-white border border-white/10 shadow-2xl flex items-center justify-center hover:bg-pool-400 transition-all active:scale-95"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: 20 }} 
            className="lg:hidden fixed inset-x-4 bottom-40 bg-slate-900/95 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden z-40 shadow-2xl shadow-black/50"
          >
            <div className="px-6 py-8 space-y-4">
              {navLinks.map((link) => (
                link.href.startsWith('#') ? (
                  <a 
                    key={link.name} 
                    href={link.href} 
                    onClick={() => setIsOpen(false)} 
                    className="block py-4 text-xl font-bold text-white hover:text-pool-400 transition-colors border-b border-white/5 last:border-0"
                  >
                    {link.name}
                  </a>
                ) : (
                  <Link 
                    key={link.name} 
                    href={link.href} 
                    onClick={() => setIsOpen(false)} 
                    className="block py-4 text-xl font-bold text-white hover:text-pool-400 transition-colors border-b border-white/5 last:border-0"
                  >
                    {link.name}
                  </Link>
                )
              ))}
              <Button asChild className="w-full bg-pool-500 py-8 text-xl rounded-2xl font-bold mt-4 shadow-xl shadow-pool-500/20">
                <a href="#contact" onClick={() => setIsOpen(false)}>Get a Quote</a>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      </nav>
    </header>
  );
}
