'use client';

import { motion } from 'framer-motion';
import { testimonials } from '@/data/testimonials';
import { Star, Quote, MapPin } from 'lucide-react';

export function TestimonialsSection() {
  return (
    <section className="py-32 bg-slate-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <Quote className="w-12 h-12 text-pool-500/20 mx-auto mb-6" />
          <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tighter mb-4">
            The Voice of <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pool-400 to-sky-300">Total Satisfaction</span>
          </h2>
          <div className="flex items-center justify-center gap-1">
            {[1,2,3,4,5].map(i => (
              <Star key={i} className="w-5 h-5 fill-pool-500 text-pool-500" />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="glass-dark p-8 rounded-[2rem] border border-white/5 relative group"
            >
              <div className="flex items-center gap-1 mb-6">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-pool-400 text-pool-400" />
                ))}
              </div>
              
              <p className="text-pool-100/80 leading-relaxed italic mb-8 text-lg">
                "{testimonial.text}"
              </p>

              <div className="flex items-center gap-4 mt-auto">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pool-500 to-pool-900 flex items-center justify-center text-white font-bold text-xl shadow-lg">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <h4 className="text-white font-bold">{testimonial.name}</h4>
                  <div className="flex items-center gap-1 text-pool-100/40 text-xs">
                    <MapPin className="w-3 h-3" />
                    <span>{testimonial.location}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
