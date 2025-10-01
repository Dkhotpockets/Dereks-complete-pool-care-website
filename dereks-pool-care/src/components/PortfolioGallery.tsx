'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Badge } from '@/components/ui/badge';
import { portfolioItems } from '@/data/portfolio';

export function PortfolioGallery() {

  return (
    <section id="portfolio" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-pool-900 mb-4">Our Work</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See the transformations we've delivered for homeowners across Long Island.
            From complete remodels to emergency repairs, quality is our standard.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolioItems.map((item) => (
            <Dialog key={item.id}>
              <DialogTrigger asChild>
                <Card className="cursor-pointer hover:shadow-xl transition-shadow group">
                  <CardHeader className="p-0">
                    <AspectRatio ratio={16 / 9}>
                      <div className="relative w-full h-full bg-pool-50 flex items-center justify-center overflow-hidden rounded-t-lg">
                        {/* Placeholder for after image */}
                        <div className="absolute inset-0 bg-gradient-to-br from-pool-100 to-pool-300 flex items-center justify-center">
                          <span className="text-pool-900 font-semibold">After: {item.title}</span>
                        </div>
                      </div>
                    </AspectRatio>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <CardTitle className="text-lg group-hover:text-pool-500 transition-colors">
                        {item.title}
                      </CardTitle>
                      {item.featured && (
                        <Badge variant="secondary" className="text-xs">Featured</Badge>
                      )}
                    </div>
                    <CardDescription className="text-sm">{item.description}</CardDescription>
                    <div className="mt-3 flex items-center gap-2 text-xs text-gray-500">
                      <span>{item.serviceType}</span>
                      {item.location && (
                        <>
                          <span>•</span>
                          <span>{item.location}</span>
                        </>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </DialogTrigger>

              <DialogContent className="max-w-4xl">
                <DialogHeader>
                  <DialogTitle className="text-2xl">{item.title}</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <p className="text-gray-700">{item.description}</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Before Image */}
                    <div>
                      <h4 className="font-semibold mb-2 text-gray-700">Before</h4>
                      <AspectRatio ratio={4 / 3}>
                        <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-400 rounded-lg flex items-center justify-center">
                          <span className="text-gray-600">Before Photo</span>
                        </div>
                      </AspectRatio>
                    </div>

                    {/* After Image */}
                    <div>
                      <h4 className="font-semibold mb-2 text-gray-700">After</h4>
                      <AspectRatio ratio={4 / 3}>
                        <div className="w-full h-full bg-gradient-to-br from-pool-100 to-pool-400 rounded-lg flex items-center justify-center">
                          <span className="text-pool-900">After Photo</span>
                        </div>
                      </AspectRatio>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-4 border-t">
                    {item.tags.map((tag) => (
                      <Badge key={tag} variant="outline">{tag}</Badge>
                    ))}
                  </div>

                  {item.completedDate && (
                    <p className="text-sm text-gray-500">
                      Completed: {new Date(item.completedDate).toLocaleDateString()}
                    </p>
                  )}
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </div>
    </section>
  );
}
