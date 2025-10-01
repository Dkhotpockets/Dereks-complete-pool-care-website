import { Button } from '@/components/ui/button';

export function HeroSection() {
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-pool-50 to-pool-500 pt-16"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[url('/images/hero-pool.jpg')] bg-cover bg-center opacity-10"></div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-pool-900 mb-6">
          Professional Pool Care for
          <br />
          <span className="text-pool-500">Long Island Homeowners</span>
        </h1>

        <p className="text-xl sm:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto">
          Premium pool maintenance, expert repairs, and stunning remodels.
          Serving Holbrook, Suffolk County, and Nassau County with 5-star rated service.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            size="lg"
            className="bg-pool-500 hover:bg-pool-900 text-white text-lg px-8 py-6"
            onClick={scrollToContact}
          >
            Request Premium Service Quote
          </Button>

          <a href="tel:6313208271">
            <Button
              size="lg"
              variant="outline"
              className="border-pool-500 text-pool-900 hover:bg-pool-50 text-lg px-8 py-6"
            >
              Call (631) 320-8271
            </Button>
          </a>
        </div>

        {/* Trust indicators */}
        <div className="mt-12 flex flex-wrap justify-center gap-8 text-pool-900">
          <div className="text-center">
            <div className="text-3xl font-bold">5.0★</div>
            <div className="text-sm text-gray-600">Rated Service</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold">25+</div>
            <div className="text-sm text-gray-600">Happy Customers</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold">15+</div>
            <div className="text-sm text-gray-600">Years Experience</div>
          </div>
        </div>
      </div>
    </section>
  );
}
