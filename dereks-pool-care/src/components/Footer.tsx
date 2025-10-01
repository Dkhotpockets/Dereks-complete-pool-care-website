import { Separator } from '@/components/ui/separator';
import { Phone, Mail, MapPin, Facebook, Instagram } from 'lucide-react';
import { businessInfo, contactInfo } from '@/data/business';

export function Footer() {
  return (
    <footer className="bg-pool-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold mb-4">{businessInfo.name}</h3>
            <p className="text-pool-50 mb-4">{businessInfo.tagline}</p>
            <div className="flex items-center gap-4">
              <a
                href={contactInfo.socialMedia.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-pool-500 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-6 w-6" />
              </a>
              <a
                href={contactInfo.socialMedia.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-pool-500 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-6 w-6" />
              </a>
            </div>
            {/* TODO: UPDATE INSTAGRAM URL - Replace #instagram-url-to-be-updated */}
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <div className="space-y-3">
              <a
                href={`tel:${contactInfo.phone.replace(/\D/g, '')}`}
                className="flex items-center gap-2 hover:text-pool-500 transition-colors"
              >
                <Phone className="h-4 w-4" />
                <span>{contactInfo.phone}</span>
              </a>
              {contactInfo.email && (
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="flex items-center gap-2 hover:text-pool-500 transition-colors"
                >
                  <Mail className="h-4 w-4" />
                  <span>{contactInfo.email}</span>
                </a>
              )}
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-1 flex-shrink-0" />
                <span>
                  {contactInfo.address.street}<br />
                  {contactInfo.address.city}, {contactInfo.address.state} {contactInfo.address.zipCode}
                </span>
              </div>
            </div>
          </div>

          {/* Business Hours */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Business Hours</h4>
            <div className="space-y-2 text-sm">
              {Object.entries(contactInfo.businessHours).map(([day, hours]) => (
                <div key={day} className="flex justify-between">
                  <span className="font-medium">{day}:</span>
                  <span className="text-pool-50">
                    {hours ? `${hours.open} - ${hours.close}` : 'Closed'}
                  </span>
                </div>
              ))}
            </div>
            {contactInfo.emergencyAvailable && (
              <p className="mt-4 text-sm text-pool-50 italic">
                Emergency service available
              </p>
            )}
          </div>
        </div>

        <Separator className="my-8 bg-pool-500" />

        {/* Service Areas */}
        <div className="mb-6">
          <h4 className="text-sm font-semibold mb-2">Service Areas:</h4>
          <p className="text-sm text-pool-50">
            {businessInfo.serviceArea.join(' • ')}
          </p>
        </div>

        {/* Copyright */}
        <div className="text-center text-sm text-pool-50">
          <p>
            © {new Date().getFullYear()} {businessInfo.name}. All rights reserved.
          </p>
          <p className="mt-1">
            Professional pool maintenance and repair services for Long Island homeowners.
          </p>
        </div>
      </div>
    </footer>
  );
}
