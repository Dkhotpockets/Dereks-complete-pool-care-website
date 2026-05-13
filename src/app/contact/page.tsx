import { Metadata } from 'next';
import { ContactSection } from '@/components/sections/ContactSection';
import { AuthoritySection } from '@/components/sections/AuthoritySection';

export const metadata: Metadata = {
  title: "Contact Us | Derek's Complete Pool Care",
  description: "Ready to transform your pool? Get a free quote for maintenance, repair, or renovation today.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-slate-950 pt-24">
      <div className="py-12">
        <ContactSection />
      </div>
      
      <div className="bg-slate-900/50">
        <AuthoritySection />
      </div>
    </main>
  );
}
