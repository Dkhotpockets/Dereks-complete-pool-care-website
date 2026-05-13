import { Phone } from 'lucide-react';
import { contactInfo } from '@/data/business';

export function StickyCallFooter() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-slate-950/90 backdrop-blur-md border-t border-pool-500/20 p-4 pb-safe shadow-[0_-10px_40px_rgba(2,6,23,0.8)]">
      <a
        href={`tel:${contactInfo.phone.replace(/\D/g, '')}`}
        className="flex items-center justify-center gap-2 w-full min-h-[48px] bg-pool-500 hover:bg-pool-400 text-white font-bold text-lg rounded-xl shadow-lg transition-colors"
      >
        <Phone className="h-5 w-5" />
        Call Now for a Quote
      </a>
    </div>
  );
}
