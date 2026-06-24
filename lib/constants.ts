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
