'use client';

import { useState } from 'react';
import { Menu, X, Phone } from 'lucide-react';

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <button
              onClick={() => scrollToSection('home')}
              className="text-2xl font-bold text-pool-900"
            >
              Derek's Pool Care
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection('home')}
              className="text-gray-700 hover:text-pool-500 transition-colors"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('services')}
              className="text-gray-700 hover:text-pool-500 transition-colors"
            >
              Services
            </button>
            <button
              onClick={() => scrollToSection('portfolio')}
              className="text-gray-700 hover:text-pool-500 transition-colors"
            >
              Portfolio
            </button>
            <button
              onClick={() => scrollToSection('testimonials')}
              className="text-gray-700 hover:text-pool-500 transition-colors"
            >
              Testimonials
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="text-gray-700 hover:text-pool-500 transition-colors"
            >
              Contact
            </button>
            <a
              href="tel:6313208271"
              className="flex items-center gap-2 text-pool-900 font-semibold hover:text-pool-500 transition-colors"
            >
              <Phone className="h-4 w-4" />
              (631) 320-8271
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-pool-500"
              aria-label="Menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <button
              onClick={() => scrollToSection('home')}
              className="block w-full text-left px-3 py-2 text-gray-700 hover:bg-pool-50 hover:text-pool-500 rounded-md"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('services')}
              className="block w-full text-left px-3 py-2 text-gray-700 hover:bg-pool-50 hover:text-pool-500 rounded-md"
            >
              Services
            </button>
            <button
              onClick={() => scrollToSection('portfolio')}
              className="block w-full text-left px-3 py-2 text-gray-700 hover:bg-pool-50 hover:text-pool-500 rounded-md"
            >
              Portfolio
            </button>
            <button
              onClick={() => scrollToSection('testimonials')}
              className="block w-full text-left px-3 py-2 text-gray-700 hover:bg-pool-50 hover:text-pool-500 rounded-md"
            >
              Testimonials
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="block w-full text-left px-3 py-2 text-gray-700 hover:bg-pool-50 hover:text-pool-500 rounded-md"
            >
              Contact
            </button>
            <a
              href="tel:6313208271"
              className="flex items-center gap-2 px-3 py-2 text-pool-900 font-semibold hover:bg-pool-50 rounded-md"
            >
              <Phone className="h-4 w-4" />
              (631) 320-8271
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
