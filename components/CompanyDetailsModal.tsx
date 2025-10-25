'use client'

import { useState, FormEvent } from 'react'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { CartItem } from '@/contexts/CartContext'
import { toast } from 'sonner'
import { formatPrice, calculateTotalPrice } from '@/lib/utils'

interface CompanyDetailsModalProps {
  isOpen: boolean
  onClose: () => void
  cartItems: CartItem[]
}

interface CompanyDetails {
  companyName: string
  contactPerson: string
  email: string
  phone: string
  address: string
}

export default function CompanyDetailsModal({
  isOpen,
  onClose,
  cartItems,
}: CompanyDetailsModalProps) {
  const [companyDetails, setCompanyDetails] = useState<CompanyDetails>({
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    address: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setCompanyDetails((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const generateWhatsAppMessage = () => {
    let message = `*QUOTATION REQUEST*\n\n`
    message += `*Company Details:*\n`
    message += `Company: ${companyDetails.companyName}\n`
    message += `Contact Person: ${companyDetails.contactPerson}\n`
    message += `Email: ${companyDetails.email}\n`
    message += `Phone: ${companyDetails.phone}\n`
    message += `Address: ${companyDetails.address}\n\n`

    message += `*Products Requested:*\n`
    message += `${'='.repeat(40)}\n\n`

    cartItems.forEach((item, index) => {
      message += `*${index + 1}. ${item.name}*\n`
      message += `   Category: ${item.category}\n`
      if (item.priceOption) {
        message += `   Option: ${item.priceOption}\n`
      }
      message += `   Price: ${formatPrice(item.price)}\n`
      message += `   Quantity: ${item.quantity}\n`
      if (item.size) {
        message += `   Size: ${item.size}\n`
      }
      if (item.specification) {
        message += `   Specification: ${item.specification}\n`
      }
      message += `\n`
    })

    const totalPrice = calculateTotalPrice(cartItems)
    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0)

    message += `${'='.repeat(40)}\n`
    message += `*Total Items: ${totalItems}*\n`
    message += `*Total Price: ${formatPrice(`RM ${totalPrice}`)}*\n\n`
    message += `Please provide a detailed quotation for the above products.\n`
    message += `Thank you!`

    return encodeURIComponent(message)
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Validate all fields
    if (
      !companyDetails.companyName ||
      !companyDetails.contactPerson ||
      !companyDetails.email ||
      !companyDetails.phone ||
      !companyDetails.address
    ) {
      toast.error('Please fill in all fields')
      setIsSubmitting(false)
      return
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(companyDetails.email)) {
      toast.error('Please enter a valid email address')
      setIsSubmitting(false)
      return
    }

    try {
      // Generate WhatsApp message
      const message = generateWhatsAppMessage()
      const whatsappNumber = '60103570729' // Malaysian number format
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`

      // Open WhatsApp in a new window
      window.open(whatsappUrl, '_blank')

      toast.success('Redirecting to WhatsApp!', {
        description: 'Your quotation request is ready to send.',
      })

      // Reset form and close modal
      setCompanyDetails({
        companyName: '',
        contactPerson: '',
        email: '',
        phone: '',
        address: '',
      })
      onClose()
    } catch (error) {
      toast.error('Failed to process request', {
        description: 'Please try again or contact us directly.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white rounded-2xl shadow-xl max-w-2xl w-full p-6 transform transition-all">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="mb-5">
            <h2 className="text-xl font-bold text-gray-900 mb-2">Company Details</h2>
            <p className="text-sm text-gray-600">
              Please provide your company information to receive a detailed quotation.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Company Name */}
            <div>
              <label htmlFor="companyName" className="block text-xs font-semibold text-gray-900 mb-1.5">
                Company Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="companyName"
                name="companyName"
                value={companyDetails.companyName}
                onChange={handleChange}
                required
                className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                placeholder="Enter your company name"
              />
            </div>

            {/* Contact Person */}
            <div>
              <label htmlFor="contactPerson" className="block text-xs font-semibold text-gray-900 mb-1.5">
                Contact Person <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="contactPerson"
                name="contactPerson"
                value={companyDetails.contactPerson}
                onChange={handleChange}
                required
                className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                placeholder="Enter contact person name"
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-xs font-semibold text-gray-900 mb-1.5">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={companyDetails.email}
                onChange={handleChange}
                required
                className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                placeholder="company@example.com"
              />
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="phone" className="block text-xs font-semibold text-gray-900 mb-1.5">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={companyDetails.phone}
                onChange={handleChange}
                required
                className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                placeholder="+60 12-345 6789"
              />
            </div>

            {/* Address */}
            <div>
              <label htmlFor="address" className="block text-xs font-semibold text-gray-900 mb-1.5">
                Company Address <span className="text-red-500">*</span>
              </label>
              <textarea
                id="address"
                name="address"
                value={companyDetails.address}
                onChange={handleChange}
                required
                rows={3}
                className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
                placeholder="Enter your company address"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-3">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1"
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="gradient"
                className="flex-1"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Processing...' : 'Send Quotation Request'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
