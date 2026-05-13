'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Droplets, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { contactInfo } from '@/data/business';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Services', href: '/services' },
  { name: 'Contact', href: '/contact' },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => setIsOpen(false), [pathname]);

  return (
    <>
      <header className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled ? "bg-slate-950/80 backdrop-blur-md border-b border-white/5 py-3" : "py-6"
      )}>
        <nav className="container mx-auto max-w-7xl px-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="p-2 bg-pool-500 rounded-lg group-hover:rotate-12 transition-transform shadow-lg shadow-pool-500/20">
              <Droplets className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tighter">
              Derek&apos;s <span className="text-pool-400">Pool Care</span>
            </span>
          </Link>

          {/* Desktop Menu (md+) */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "text-sm font-bold uppercase tracking-widest transition-colors",
                  pathname === link.href ? "text-pool-400" : "text-white/70 hover:text-white"
                )}
              >
                {link.name}
              </Link>
            ))}
            <div className="flex items-center gap-6 border-l border-white/10 pl-6">
              <a href={`tel:${contactInfo.phone.replace(/\D/g, '')}`} className="flex items-center gap-2 text-pool-400 font-bold hover:text-pool-300 transition-colors">
                <Phone className="h-4 w-4" /> {contactInfo.phone}
              </a>
              <Button asChild className="bg-pool-500 hover:bg-pool-400 rounded-full font-bold shadow-lg shadow-pool-500/20 transition-all hover:scale-105 active:scale-95">
                <Link href="/contact">Get a Quote</Link>
              </Button>
            </div>
          </div>

          {/* Mobile Placeholder (Toggle is fixed bottom-right) */}
          <div className="md:hidden invisible h-6 w-6" />
        </nav>
      </header>

      {/* Mobile Ergonomic Toggle (Fixed Bottom-Right) */}
      <div className="md:hidden fixed bottom-24 right-6 z-[60]">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-16 h-16 rounded-full bg-pool-500 text-white shadow-2xl flex items-center justify-center border border-white/20 active:scale-95 transition-transform"
          aria-label="Toggle Menu"
        >
          {isOpen ? <X className="h-8 w-8" /> : <Menu className="h-8 w-8" />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-[45]"
            />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="md:hidden fixed inset-x-4 bottom-44 bg-slate-900/95 backdrop-blur-xl z-50 rounded-[2.5rem] border border-white/10 shadow-2xl overflow-hidden"
            >
              <div className="flex flex-col h-full p-8 gap-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={cn(
                      "text-4xl font-bold transition-colors",
                      pathname === link.href ? "text-pool-400" : "text-white hover:text-pool-400"
                    )}
                  >
                    {link.name}
                  </Link>
                ))}
                <div className="mt-4 pt-6 border-t border-white/10 space-y-6">
                   <a href={`tel:${contactInfo.phone.replace(/\D/g, '')}`} className="flex items-center gap-4 text-2xl text-pool-400 font-bold">
                     <Phone className="h-7 w-7" /> {contactInfo.phone}
                   </a>
                   <Button asChild size="lg" className="w-full bg-pool-500 py-8 text-xl rounded-2xl font-bold shadow-xl shadow-pool-500/20">
                     <Link href="/contact">Get a Quote</Link>
                   </Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
