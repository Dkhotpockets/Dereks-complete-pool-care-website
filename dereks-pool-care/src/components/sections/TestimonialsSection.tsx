import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { testimonials } from '@/data/testimonials';
import { Star } from 'lucide-react';

export function TestimonialsSection() {
  const featuredTestimonials = testimonials.filter((t) => t.featured);

  return (
    <section id="testimonials" className="py-20 bg-pool-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-pool-900 mb-4">What Our Customers Say</h2>
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-6 w-6 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <span className="text-2xl font-bold text-pool-900">5.0</span>
          </div>
          <p className="text-xl text-gray-600">Based on 25+ reviews from satisfied customers</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {featuredTestimonials.map((testimonial) => (
            <Card key={testimonial.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-lg">{testimonial.customerName}</h3>
                      {testimonial.location && (
                        <span className="text-sm text-gray-500">• {testimonial.location}</span>
                      )}
                    </div>
                    <div className="flex items-center gap-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 italic mb-4">&ldquo;{testimonial.reviewText}&rdquo;</p>
                {testimonial.serviceType && (
                  <p className="text-sm text-pool-500 font-medium">
                    Service: {testimonial.serviceType}
                  </p>
                )}
                <p className="text-xs text-gray-400 mt-2">
                  {new Date(testimonial.date).toLocaleDateString('en-US', {
                    month: 'long',
                    year: 'numeric',
                  })}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
