import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { services } from '@/data/services';
import { Droplets, Paintbrush, Wrench, Settings, Circle, Sparkles } from 'lucide-react';

const iconMap = {
  droplets: Droplets,
  paintbrush: Paintbrush,
  wrench: Wrench,
  settings: Settings,
  circle: Circle,
  sparkles: Sparkles,
};

export function ServicesSection() {
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-pool-900 mb-4">Our Services</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive pool care solutions tailored to Long Island homeowners.
            From routine maintenance to complete remodels.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => {
            const Icon = service.icon ? iconMap[service.icon as keyof typeof iconMap] : Droplets;

            return (
              <Card key={service.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-pool-50 rounded-lg">
                        <Icon className="h-6 w-6 text-pool-500" />
                      </div>
                      <div>
                        <CardTitle className="text-xl">{service.name}</CardTitle>
                        {service.popular && (
                          <Badge className="mt-1 bg-pool-500">Premium</Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  <CardDescription className="mt-2">{service.shortDescription}</CardDescription>
                </CardHeader>

                <CardContent>
                  <ul className="space-y-2 text-sm text-gray-600">
                    {service.features.slice(0, 4).map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-pool-500 mt-1">✓</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-4 pt-4 border-t">
                    <p className="text-sm font-semibold text-pool-900">
                      {service.startingPrice
                        ? `Starting at $${service.startingPrice}`
                        : service.priceNote}
                    </p>
                  </div>
                </CardContent>

                <CardFooter>
                  <Button
                    onClick={scrollToContact}
                    variant="outline"
                    className="w-full border-pool-500 text-pool-900 hover:bg-pool-50"
                  >
                    Contact for Details
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
