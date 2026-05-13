import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { StickyCallFooter } from "@/components/StickyCallFooter";
import { contactInfo } from "@/data/business";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#0ea5e9",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "Derek's Complete Pool Care | Luxury Pool Maintenance Long Island",
  description: "Long Island's premier 5-star pool service. 15+ years experience in luxury pool maintenance, repairs, and transformations.",
  formatDetection: {
    telephone: false,
  },
  keywords: [
    "pool maintenance",
    "pool repair",
    "pool cleaning",
    "pool service",
    "Long Island pool care",
    "Holbrook pool service",
    "Suffolk County pools",
    "Nassau County pools",
    "pool remodeling",
    "luxury pool care",
    "Derek's Complete Pool Care",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "name": "Derek's Complete Pool Care",
    "image": "https://www.derekscompletepoolcare.com/luxury_hero.png",
    "telephone": contactInfo.phone,
    "address": {
      "@type": "PostalAddress",
      "addressRegion": "NY",
      "addressLocality": "Long Island",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoShape",
      "region": "NY",
      "addressCountry": "US"
    },
    "areaServed": ["Suffolk County", "Nassau County", "The Hamptons"],
    "priceRange": "$$",
    "openingHours": "Mo-Fr 08:00-18:00"
  };

  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.variable} font-sans antialiased bg-slate-950 text-white selection:bg-pool-500/30 selection:text-pool-200`}>
        <Navigation />
        {children}
        <Footer />
        <StickyCallFooter />
        <Analytics />
      </body>
    </html>
  );
}
