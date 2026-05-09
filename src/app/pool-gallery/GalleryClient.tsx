"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowLeft, Droplets } from "lucide-react";
import Link from "next/link";

export default function GalleryClient({ groups }: { groups: { [group: string]: string[] } }) {
  return (
    <div className="min-h-screen bg-slate-950 py-24 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,#0c4a6e,transparent_60%)]" />
        <div className="absolute inset-0 bg-grid-pool opacity-10" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-16">
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-pool-400 hover:text-white transition-colors font-bold uppercase tracking-widest text-xs mb-6 group"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" /> Back to Home
            </Link>
            <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tighter">
              Pool <span className="text-transparent bg-clip-text bg-gradient-to-r from-pool-400 to-pool-600">Gallery</span>
            </h1>
          </div>
          
          <div className="hidden md:flex items-center gap-3 p-4 glass-dark rounded-2xl border border-white/10">
            <div className="w-10 h-10 bg-pool-500 rounded-xl flex items-center justify-center shadow-lg shadow-pool-500/20">
              <Droplets className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-white font-bold text-sm leading-none">Actual Projects</p>
              <p className="text-pool-100/40 text-[10px] uppercase tracking-widest mt-1">Verified Work</p>
            </div>
          </div>
        </div>

        {Object.entries(groups).map(([group, files], groupIndex) => (
          <motion.div 
            key={group} 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: groupIndex * 0.1 }}
            className="mb-20"
          >
            <div className="flex items-center gap-4 mb-8">
              <h2 className="text-2xl font-bold text-white tracking-tight">{group}</h2>
              <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {files.map((file, fileIndex) => (
                <motion.div 
                  key={file}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: fileIndex * 0.05 }}
                  className="group relative aspect-[4/3] bg-slate-900 rounded-3xl overflow-hidden border border-white/5 hover:border-pool-500/50 transition-all duration-500 shadow-2xl"
                >
                  <Image
                    src={`/pool-pics/${file}`}
                    alt={file}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
