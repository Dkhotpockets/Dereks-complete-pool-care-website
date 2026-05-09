'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const projects = [
  { id: 1, title: "Modern Inground Repair", image: "/pool-pics/20230826_122739.jpg" },
  { id: 2, title: "Precision Plumbing", image: "/pool-pics/20190610_132920.jpg" },
  { id: 3, title: "Elite Above Ground", image: "/pool-pics/20230511_153601.jpg" },
  { id: 4, title: "Crystal Clear Showcase", image: "/pool-pics/IMG_20190518_185542.jpg" },
];

export function PortfolioGallery() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {projects.map((project) => (
        <motion.div
          key={project.id}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="group relative h-[400px] rounded-[40px] overflow-hidden bg-slate-100"
        >
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute bottom-10 left-10 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
            <h3 className="text-2xl font-bold text-white">{project.title}</h3>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
