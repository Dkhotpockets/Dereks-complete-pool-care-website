"use client";

import Image from 'next/image';
import { motion } from 'framer-motion';
import { PoolModel } from '@/data/pools';

interface PoolCardProps {
  pool: PoolModel;
  onSelect?: (pool: PoolModel) => void;
}

export default function PoolCard({ pool, onSelect }: PoolCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -10 }}
      className="bg-zinc-900/50 border border-white/10 rounded-2xl overflow-hidden glass-dark group"
    >
      <div className="relative h-64 overflow-hidden">
        <Image
          src={pool.image}
          alt={pool.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-pool-600 text-white px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase">
            {pool.series}
          </span>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-2xl font-bold text-white mb-2">{pool.name}</h3>
        <p className="text-zinc-400 text-sm mb-4 line-clamp-2">
          {pool.description}
        </p>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-zinc-800/50 p-3 rounded-xl border border-white/5">
            <span className="block text-[10px] uppercase text-zinc-500 font-bold mb-1">Shapes</span>
            <span className="text-white text-sm font-medium">{pool.shapes.join(' & ')}</span>
          </div>
          <div className="bg-zinc-800/50 p-3 rounded-xl border border-white/5">
            <span className="block text-[10px] uppercase text-zinc-500 font-bold mb-1">Wall Height</span>
            <span className="text-white text-sm font-medium">{pool.specs.wallHeight}</span>
          </div>
        </div>

        <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
          <span className="text-zinc-400 text-xs font-medium uppercase tracking-wider">Premium Selection</span>
          <button
            onClick={() => onSelect?.(pool)}
            className="bg-white text-black px-6 py-2 rounded-full font-bold text-sm hover:bg-pool-500 hover:text-white transition-all duration-300 shadow-lg shadow-white/5"
          >
            View Details
          </button>
        </div>
      </div>
    </motion.div>
  );
}
