'use client';

import Link from 'next/link';
import { Droplets, Phone, Mail, MapPin, Star, Facebook, Instagram } from 'lucide-react';
import { businessInfo, contactInfo } from '@/data/business';

export function Footer() {
  return (
    <footer className="bg-slate-950 pt-24 pb-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          
          {/* Brand Col */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-8 group">
              <div className="p-2 bg-pool-500 rounded-xl group-hover:rotate-12 transition-transform duration-500 shadow-lg shadow-pool-500/20">
                <Droplets className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tighter text-white">
                Derek&apos;s <span className="text-pool-400">Complete Pool Care</span>
              </span>
            </Link>
            <p className="text-pool-100/40 text-sm leading-relaxed mb-8">
              Long Island's premier provider of high-end pool maintenance and luxury transformations. {businessInfo.yearsInBusiness}+ years of 5-star service.
            </p>
            <div className="flex gap-4">
              <a 
                href={contactInfo.socialMedia.facebook} 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-3 bg-white/5 rounded-xl text-pool-100/40 hover:text-white hover:bg-pool-500 transition-all duration-300 shadow-xl"
                aria-label="Follow us on Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                href={contactInfo.socialMedia.instagram} 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-3 bg-white/5 rounded-xl text-pool-100/40 hover:text-white hover:bg-pool-500 transition-all duration-300 shadow-xl"
                aria-label="Follow us on Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Contact Col */}
          <div>
            <h4 className="text-white font-bold mb-8 uppercase text-xs tracking-widest">Contact Info</h4>
            <ul className="space-y-6">
              <li className="flex items-start gap-4 group">
                <Phone className="w-5 h-5 text-pool-500 shrink-0" />
                <div>
                  <p className="text-pool-100/40 text-[10px] uppercase tracking-widest mb-1">Call Anytime</p>
                  <p className="text-white font-semibold group-hover:text-pool-400 transition-colors">{contactInfo.phone}</p>
                </div>
              </li>
              <li className="flex items-start gap-4 group">
                <Mail className="w-5 h-5 text-pool-500 shrink-0" />
                <div>
                  <p className="text-pool-100/40 text-[10px] uppercase tracking-widest mb-1">Email Us</p>
                  <p className="text-white font-semibold group-hover:text-pool-400 transition-colors">{contactInfo.email}</p>
                </div>
              </li>
              <li className="flex items-start gap-4 group">
                <MapPin className="w-5 h-5 text-pool-500 shrink-0" />
                <div>
                  <p className="text-pool-100/40 text-[10px] uppercase tracking-widest mb-1">Service Areas</p>
                  <p className="text-white font-semibold">Suffolk & Nassau County</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-8 uppercase text-xs tracking-widest">Quick Links</h4>
            <ul className="space-y-4">
              {['Services', 'Testimonials', 'Contact'].map(item => (
                <li key={item}>
                  <a href={`#${item.toLowerCase()}`} className="text-pool-100/40 hover:text-pool-400 transition-colors font-medium">
                    {item}
                  </a>
                </li>
              ))}
              <li>
                <Link href="/pool-gallery" className="text-pool-100/40 hover:text-pool-400 transition-colors font-medium">
                  Gallery
                </Link>
              </li>
            </ul>
          </div>

          {/* Trust Col */}
          <div>
            <h4 className="text-white font-bold mb-8 uppercase text-xs tracking-widest">Accreditations</h4>
            <div className="glass-dark p-6 rounded-2xl border border-white/5">
              <div className="flex items-center gap-1 mb-3">
                {[1,2,3,4,5].map(i => (
                  <Star key={i} className="w-4 h-4 fill-pool-500 text-pool-500" />
                ))}
              </div>
              <p className="text-white font-bold mb-1">5.0 Google Rating</p>
              <p className="text-pool-100/30 text-[10px] leading-tight">Verified satisfaction across all of Long Island.</p>
            </div>
          </div>

        </div>

        <div className="border-t border-white/5 pt-12 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-pool-100/20 text-xs">
            © {new Date().getFullYear()} Derek's Complete Pool Care. All rights reserved.
          </p>
          <div className="flex gap-8 text-pool-100/20 text-[10px] uppercase tracking-widest font-bold">
            <a href="#" className="hover:text-pool-400">Privacy Policy</a>
            <a href="#" className="hover:text-pool-400">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
