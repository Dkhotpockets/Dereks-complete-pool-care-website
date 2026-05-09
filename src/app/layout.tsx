import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
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
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: "Derek's Complete Pool Care | Luxury Pool Maintenance Long Island",
  description: "Long Island's premier 5-star pool service. 15+ years experience in luxury pool maintenance, repairs, and transformations.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Derek's Pools",
  },
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
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} font-sans antialiased bg-slate-950 text-white selection:bg-pool-500/30 selection:text-pool-200`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
