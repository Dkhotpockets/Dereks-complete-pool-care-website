'use client';

import { contactInfo } from '@/data/business';

export function GoogleMapEmbed() {
  const address = `${contactInfo.address.street}, ${contactInfo.address.city}, ${contactInfo.address.state} ${contactInfo.address.zipCode}`;

  // Google Maps Embed URL
  const mapUrl = `https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || 'YOUR_API_KEY'}&q=${encodeURIComponent(address)}&zoom=14`;

  return (
    <div className="w-full">
      <h3 className="text-2xl font-bold text-pool-900 mb-4">Visit Us</h3>
      <div className="relative w-full h-[400px] rounded-lg overflow-hidden shadow-lg">
        {/* Fallback if no API key */}
        {!process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ? (
          <div className="absolute inset-0 bg-pool-50 flex flex-col items-center justify-center p-8 text-center">
            <div className="bg-white p-6 rounded-lg shadow-md max-w-md">
              <h4 className="font-bold text-lg mb-2 text-pool-900">Our Location</h4>
              <p className="text-gray-700 mb-4">
                {contactInfo.address.street}<br />
                {contactInfo.address.city}, {contactInfo.address.state} {contactInfo.address.zipCode}
              </p>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-6 py-2 bg-pool-500 text-white rounded-md hover:bg-pool-900 transition-colors"
              >
                Get Directions
              </a>
            </div>
          </div>
        ) : (
          <iframe
            src={mapUrl}
            className="absolute inset-0 w-full h-full border-0"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Derek's Complete Pool Care Location"
          />
        )}
      </div>
      <div className="mt-4 text-center">
        <p className="text-gray-600">
          <strong>Address:</strong> {address}
        </p>
        <p className="text-sm text-gray-500 mt-2">
          Serving Holbrook, Suffolk County, Nassau County, and all of Long Island
        </p>
      </div>
    </div>
  );
}
