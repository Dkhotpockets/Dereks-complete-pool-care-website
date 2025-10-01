import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://derekscompletepoolcare.com'),
  title: "Derek's Complete Pool Care | Expert Pool Maintenance & Repair in Long Island",
  description: "5-star rated pool maintenance, repair, and remodeling services in Holbrook, Suffolk County, and Nassau County. Over 15 years serving Long Island. Call (631) 320-8271 for a free quote.",
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
    "inground pool plumbing",
    "above ground pools",
    "Derek's Complete Pool Care",
  ],
  authors: [{ name: "Derek's Complete Pool Care" }],
  creator: "Derek's Complete Pool Care",
  publisher: "Derek's Complete Pool Care",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://derekscompletepoolcare.com",
    siteName: "Derek's Complete Pool Care",
    title: "Derek's Complete Pool Care | Expert Pool Maintenance & Repair in Long Island",
    description: "5-star rated pool maintenance, repair, and remodeling services in Holbrook, Suffolk County, and Nassau County. Over 15 years serving Long Island.",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Derek's Complete Pool Care - Professional Pool Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Derek's Complete Pool Care | Expert Pool Maintenance & Repair in Long Island",
    description: "5-star rated pool maintenance, repair, and remodeling services in Holbrook, Suffolk County, and Nassau County.",
    images: ["/images/twitter-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "google-site-verification-code", // TODO: Replace with actual verification code
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://derekscompletepoolcare.com",
    "name": "Derek's Complete Pool Care",
    "description": "Professional pool maintenance, repair, and remodeling services for Long Island homeowners",
    "url": "https://derekscompletepoolcare.com",
    "telephone": "+16313208271",
    "email": "info@derekscompletepoolcare.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Holbrook",
      "addressLocality": "Holbrook",
      "addressRegion": "NY",
      "postalCode": "11741",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 40.8120,
      "longitude": -73.0779
    },
    "areaServed": [
      {
        "@type": "City",
        "name": "Holbrook"
      },
      {
        "@type": "AdministrativeArea",
        "name": "Suffolk County"
      },
      {
        "@type": "AdministrativeArea",
        "name": "Nassau County"
      },
      {
        "@type": "Place",
        "name": "Long Island"
      }
    ],
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "08:00",
        "closes": "17:00"
      }
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5.0",
      "reviewCount": "25",
      "bestRating": "5",
      "worstRating": "1"
    },
    "priceRange": "$$",
    "image": "https://derekscompletepoolcare.com/images/og-image.jpg",
    "sameAs": [
      "https://www.facebook.com/completepoolcare/",
      "https://www.yelp.com/biz/dereks-complete-pool-care-holbrook"
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Pool Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Pool Maintenance & Cleaning",
            "description": "Professional pool maintenance and cleaning services"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Pool Remodeling",
            "description": "Complete pool renovation and remodeling services"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Pool Repair",
            "description": "Expert pool equipment and plumbing repair services"
          }
        }
      ]
    }
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
