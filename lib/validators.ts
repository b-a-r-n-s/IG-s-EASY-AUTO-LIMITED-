import { z } from 'zod'

// Phone number validation (Nigeria format)
const phoneSchema = z
  .string()
  .min(10, 'Phone number must be at least 10 digits')
  .regex(/^[\d+\s\-()]+$/, 'Phone number is invalid')

// Email validation
const emailSchema = z
  .string()
  .email('Please enter a valid email address')

// Contact Inquiry Form
export const contactInquirySchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters'),
  email: emailSchema,
  phone: phoneSchema,
  message: z
    .string()
    .min(10, 'Message must be at least 10 characters')
    .max(1000, 'Message must be less than 1000 characters'),
  vehicleId: z.string().uuid('Invalid vehicle ID').optional(),
})

export type ContactInquiryFormData = z.infer<typeof contactInquirySchema>

// Procurement Request Form
export const procurementRequestSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters'),
  email: emailSchema,
  phone: phoneSchema,
  desiredVehicle: z
    .string()
    .min(3, 'Please specify your desired vehicle')
    .max(200, 'Vehicle description is too long'),
  budget: z
    .number()
    .positive('Budget must be a positive number')
    .max(999999999, 'Budget is too high'),
  requirements: z
    .string()
    .min(5, 'Please provide more details about your requirements')
    .max(1000, 'Requirements description is too long')
    .optional(),
})

export type ProcurementRequestFormData = z.infer<typeof procurementRequestSchema>

// Sell Your Car Request Form
export const sellCarRequestSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters'),
  email: emailSchema,
  phone: phoneSchema,
  vehicleMake: z
    .string()
    .min(2, 'Please specify vehicle make')
    .max(50, 'Vehicle make is too long'),
  vehicleModel: z
    .string()
    .min(2, 'Please specify vehicle model')
    .max(50, 'Vehicle model is too long'),
  vehicleYear: z
    .number()
    .int('Year must be a whole number')
    .min(1950, 'Year must be 1950 or later')
    .max(new Date().getFullYear() + 1, 'Year cannot be in the future'),
  mileage: z
    .number()
    .int('Mileage must be a whole number')
    .min(0, 'Mileage cannot be negative')
    .max(9999999, 'Mileage is too high'),
  priceExpectation: z
    .number()
    .positive('Price must be a positive number')
    .max(999999999, 'Price is too high'),
  condition: z
    .enum(['New', 'Excellent', 'Good', 'Fair'], {
      errorMap: () => ({ message: 'Please select a valid condition' }),
    }),
  photosUrls: z
    .array(z.string().url('Invalid image URL'))
    .optional(),
  notes: z
    .string()
    .max(1000, 'Notes must be less than 1000 characters')
    .optional(),
})

export type SellCarRequestFormData = z.infer<typeof sellCarRequestSchema>

// Admin Login Form
export const adminLoginSchema = z.object({
  email: emailSchema,
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters')
    .max(50, 'Password is too long'),
})

export type AdminLoginFormData = z.infer<typeof adminLoginSchema>

// Add/Edit Vehicle Form
export const vehicleFormSchema = z.object({
  make: z
    .string()
    .min(2, 'Make must be at least 2 characters')
    .max(50, 'Make is too long'),
  model: z
    .string()
    .min(2, 'Model must be at least 2 characters')
    .max(50, 'Model is too long'),
  year: z
    .number()
    .int('Year must be a whole number')
    .min(1950, 'Year must be 1950 or later')
    .max(new Date().getFullYear() + 1, 'Year cannot be in the future'),
  price: z
    .number()
    .positive('Price must be a positive number')
    .max(999999999, 'Price is too high'),
  transmission: z
    .enum(['Manual', 'Automatic', 'CVT'], {
      errorMap: () => ({ message: 'Please select a valid transmission' }),
    }),
  fuelType: z
    .enum(['Petrol', 'Diesel', 'Hybrid', 'Electric'], {
      errorMap: () => ({ message: 'Please select a valid fuel type' }),
    }),
  bodyType: z
    .enum(['Sedan', 'SUV', 'Hatchback', 'Coupe', 'Truck', 'Van', 'Wagon'], {
      errorMap: () => ({ message: 'Please select a valid body type' }),
    }),
  mileage: z
    .number()
    .int('Mileage must be a whole number')
    .min(0, 'Mileage cannot be negative')
    .max(9999999, 'Mileage is too high'),
  condition: z
    .enum(['New', 'Excellent', 'Good', 'Fair'], {
      errorMap: () => ({ message: 'Please select a valid condition' }),
    }),
  description: z
    .string()
    .min(20, 'Description must be at least 20 characters')
    .max(2000, 'Description must be less than 2000 characters'),
  status: z
    .enum(['available', 'reserved', 'sold'], {
      errorMap: () => ({ message: 'Please select a valid status' }),
    })
    .optional(),
  featured: z.boolean().optional(),
})

export type VehicleFormData = z.infer<typeof vehicleFormSchema>

// Newsletter Subscription
export const newsletterSchema = z.object({
  email: emailSchema,
})

export type NewsletterFormData = z.infer<typeof newsletterSchema>

// Testimonial Form (Admin)
export const testimonialFormSchema = z.object({
  customerName: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name is too long'),
  customerRole: z
    .string()
    .min(2, 'Role must be at least 2 characters')
    .max(100, 'Role is too long')
    .optional(),
  quote: z
    .string()
    .min(20, 'Quote must be at least 20 characters')
    .max(500, 'Quote must be less than 500 characters'),
  rating: z
    .number()
    .int('Rating must be a whole number')
    .min(1, 'Rating must be at least 1')
    .max(5, 'Rating cannot be more than 5'),
  avatarUrl: z
    .string()
    .url('Please enter a valid image URL')
    .optional(),
  featured: z.boolean().optional(),
})

export type TestimonialFormData = z.infer<typeof testimonialFormSchema>
