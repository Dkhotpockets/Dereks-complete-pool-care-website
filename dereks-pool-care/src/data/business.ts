import type { BusinessInfo, ContactInfo } from '@/types';

export const businessInfo: BusinessInfo = {
  name: "Derek's Complete Pool Care",
  tagline: "Professional Pool Maintenance Services",
  description: "Premier pool maintenance and repair services serving Holbrook and Long Island. We specialize in premium pool care, equipment repair, and inground pool remodeling for discerning homeowners.",
  established: 2010,
  serviceArea: ["Holbrook, NY", "Suffolk County", "Nassau County", "Long Island"],
  rating: 5.0,
  reviewCount: 25
};

export const contactInfo: ContactInfo = {
  phone: "(631) 320-8271",
  email: "info@derekspoolcare.com",
  address: {
    street: "1233 Bastow St",
    city: "Holbrook",
    state: "NY",
    zipCode: "11741",
    coordinates: {
      lat: 40.8120,
      lng: -73.0779
    }
  },
  businessHours: {
    Monday: { open: "8:00 AM", close: "5:00 PM" },
    Tuesday: { open: "8:00 AM", close: "5:00 PM" },
    Wednesday: { open: "8:00 AM", close: "5:00 PM" },
    Thursday: { open: "8:00 AM", close: "5:00 PM" },
    Friday: { open: "8:00 AM", close: "5:00 PM" },
    Saturday: null,
    Sunday: null
  },
  emergencyAvailable: true,
  socialMedia: {
    facebook: "https://www.facebook.com/completepoolcare/",
    // TODO: UPDATE INSTAGRAM URL - Replace #instagram-url-to-be-updated
    instagram: "#instagram-url-to-be-updated"
  }
};
