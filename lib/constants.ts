// Company Information
export const COMPANY = {
  name: 'IG Easy Auto Limited',
  tagline: 'LUXURY • RELIABILITY • TRUST',
  description: 'Premium vehicle sales and procurement services',
  email: process.env.NEXT_PUBLIC_COMPANY_EMAIL || 'info@igeasyauto.com',
  phone1: process.env.NEXT_PUBLIC_COMPANY_PHONE_1 || '+2348167984867',
  phone2: process.env.NEXT_PUBLIC_COMPANY_PHONE_2 || '+2348100005213',
  address: process.env.NEXT_PUBLIC_COMPANY_ADDRESS || 'Beside NNPC, One Man Village, Karu, Nasarawa State',
  website: process.env.NEXT_PUBLIC_COMPANY_WEBSITE || 'www.igeasyauto.com',
  ceo: 'Emmanuel Okoh',
  ceoTitle: 'Chief Executive Officer',
}

// WhatsApp Configuration
export const WHATSAPP = {
  phone: process.env.NEXT_PUBLIC_WHATSAPP_PHONE || '+2348167984867',
  message: process.env.NEXT_PUBLIC_WHATSAPP_MESSAGE || 'Hello IG Easy Auto Limited, I am interested in your automobile services. Please provide more information.',
  url: `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_PHONE?.replace(/\D/g, '') || '2348167984867'}?text=${encodeURIComponent(process.env.NEXT_PUBLIC_WHATSAPP_MESSAGE || 'Hello IG Easy Auto Limited, I am interested in your automobile services. Please provide more information.')}`,
}

// Business Hours
export const BUSINESS_HOURS = {
  monday: { open: '08:00', close: '18:00' },
  tuesday: { open: '08:00', close: '18:00' },
  wednesday: { open: '08:00', close: '18:00' },
  thursday: { open: '08:00', close: '18:00' },
  friday: { open: '08:00', close: '18:00' },
  saturday: { open: '08:00', close: '18:00' },
  sunday: { open: '10:00', close: '18:00' },
}

// Colors
export const COLORS = {
  primary: '#000000',
  gold: '#D4AF37',
  darkGold: '#B8860B',
  silver: '#C0C0C0',
  white: '#FFFFFF',
  lightGray: '#F5F5F5',
  darkGray: '#1A1A1A',
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  info: '#3B82F6',
}

// Navigation Links
export const NAVIGATION = [
  { name: 'Home', href: '/' },
  { name: 'Inventory', href: '/inventory' },
  { name: 'Procurement', href: '/procurement' },
  { name: 'Sell Your Car', href: '/sell-your-car' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
]

// Footer Links
export const FOOTER_LINKS = {
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'Contact Us', href: '/contact' },
    { name: 'Privacy Policy', href: '/privacy-policy' },
    { name: 'Terms of Service', href: '/terms' },
  ],
  services: [
    { name: 'Buy a Car', href: '/inventory' },
    { name: 'Procurement', href: '/procurement' },
    { name: 'Sell Your Car', href: '/sell-your-car' },
  ],
  connect: [
    { name: 'WhatsApp', href: WHATSAPP.url },
    { name: `Call: ${COMPANY.phone1}`, href: `tel:${COMPANY.phone1}` },
    { name: `Email: ${COMPANY.email}`, href: `mailto:${COMPANY.email}` },
  ],
}

// Procurement Service Details
export const PROCUREMENT_SERVICE = {
  title: 'Vehicle Procurement Service',
  description: 'We find and deliver your dream car',
  timeline: '1 week typical, 2 weeks maximum',
  successRate: '91.56%',
  features: [
    'Professional sourcing of quality vehicles',
    'Competitive pricing and best deals',
    'Complete documentation handling',
    'Delivery to your location',
    'Post-purchase support',
  ],
}

// Sell Your Car Service Details
export const SELL_SERVICE = {
  title: 'Sell Your Car',
  description: 'Quick and hassle-free car selling',
  features: [
    'Fair market valuation',
    'Quick approval process',
    'Instant payment options',
    'No hidden charges',
    'Professional inspection',
  ],
}

// Why Choose Us
export const WHY_CHOOSE_US = [
  {
    icon: 'shield',
    title: 'Trusted Partner',
    description: 'Over 91.56% success rate in vehicle procurement',
  },
  {
    icon: 'zap',
    title: 'Fast Service',
    description: 'Procurement completed in 1-2 weeks',
  },
  {
    icon: 'award',
    title: 'Premium Quality',
    description: 'Only quality vehicles and genuine transactions',
  },
  {
    icon: 'heart',
    title: 'Customer Satisfaction',
    description: 'Quality and satisfaction in every transaction',
  },
]

// Vehicle Filters
export const VEHICLE_FILTERS = {
  makes: ['Toyota', 'BMW', 'Mercedes-Benz', 'Audi', 'Lexus', 'Honda', 'Ford', 'Chevrolet', 'Volkswagen', 'Hyundai', 'Kia', 'Mazda'],
  transmissions: ['Manual', 'Automatic', 'CVT'],
  fuelTypes: ['Petrol', 'Diesel', 'Hybrid', 'Electric'],
  bodyTypes: ['Sedan', 'SUV', 'Hatchback', 'Coupe', 'Truck', 'Van', 'Wagon'],
  conditions: ['New', 'Excellent', 'Good', 'Fair'],
  priceRanges: [
    { label: 'All Prices', min: 0, max: Infinity },
    { label: 'Under ₦2,000,000', min: 0, max: 2000000 },
    { label: '₦2M - ₦5M', min: 2000000, max: 5000000 },
    { label: '₦5M - ₦10M', min: 5000000, max: 10000000 },
    { label: '₦10M - ₦20M', min: 10000000, max: 20000000 },
    { label: 'Over ₦20M', min: 20000000, max: Infinity },
  ],
}

// Pagination
export const PAGINATION = {
  vehiclesPerPage: 12,
  testimonialsPerPage: 6,
}

// SEO Defaults
export const SEO_DEFAULTS = {
  siteName: 'IG Easy Auto Limited',
  description: 'Premium vehicle sales and procurement services. Luxury, reliability, and trust in every transaction.',
  keywords: 'vehicle sales, car procurement, buy car, sell car, automobile dealer, luxury cars, Nigeria',
  author: 'IG Easy Auto Limited',
  image: '/og-image.png',
}

// API Response Messages
export const MESSAGES = {
  success: 'Operation completed successfully',
  error: 'An error occurred. Please try again.',
  loading: 'Loading...',
  noResults: 'No results found',
  required: 'This field is required',
  invalidEmail: 'Please enter a valid email address',
  invalidPhone: 'Please enter a valid phone number',
  inquiry: {
    success: 'Your inquiry has been sent. We will contact you soon.',
    error: 'Failed to send inquiry. Please try again.',
  },
  procurement: {
    success: 'Your procurement request has been received. We will contact you within 24 hours.',
    error: 'Failed to submit procurement request. Please try again.',
  },
  sellCar: {
    success: 'Your car listing has been submitted. We will review and contact you soon.',
    error: 'Failed to submit car listing. Please try again.',
  },
}

// Admin Dashboard
export const ADMIN = {
  defaultPageSize: 20,
  sessionTimeout: 24 * 60 * 60 * 1000, // 24 hours in milliseconds
}

// Analytics
export const GA4_ID = process.env.NEXT_PUBLIC_GA4_TRACKING_ID || ''
