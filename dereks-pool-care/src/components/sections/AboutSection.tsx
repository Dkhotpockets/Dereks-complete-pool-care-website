import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, MapPin, Star, Clock } from 'lucide-react';

export function AboutSection() {
  const differentiators = [
    {
      icon: MapPin,
      title: 'Local Long Island Expertise',
      description: 'Born and raised on Long Island, we understand the unique challenges of pool maintenance in our climate. Serving Suffolk and Nassau Counties for over 15 years.',
    },
    {
      icon: Star,
      title: '5.0-Star Rated Service',
      description: 'Consistently rated 5 stars by our customers on Google, Yelp, and Facebook. Our commitment to excellence shows in every job we complete.',
    },
    {
      icon: Shield,
      title: 'Premium Equipment & Techniques',
      description: 'We use only the highest quality equipment and industry-leading techniques to ensure your pool stays pristine all season long.',
    },
    {
      icon: Clock,
      title: 'Emergency & Holiday Service',
      description: 'Pool emergency before a party? We offer same-day emergency service and are available on holidays when you need us most.',
    },
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-pool-900 mb-4">
            Why Choose Derek's Complete Pool Care?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're not just another pool company. We're your neighbors, dedicated to keeping
            Long Island pools crystal clear and families happy.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {differentiators.map((item) => {
            const Icon = item.icon;
            return (
              <Card key={item.title} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-full bg-pool-50 text-pool-500">
                    <Icon className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{item.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-pool-50 rounded-lg p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-pool-900 mb-4">
              Family-Owned & Operated Since 2009
            </h3>
            <p className="text-gray-700 leading-relaxed">
              Derek's Complete Pool Care was founded with a simple mission: provide Long Island
              homeowners with honest, reliable, and professional pool services. From routine
              maintenance to complex repairs and complete remodels, we treat every pool like
              it's our own. When you choose Derek's, you're choosing a partner who cares about
              your satisfaction and your family's enjoyment.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
