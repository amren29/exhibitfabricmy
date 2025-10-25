'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useCart } from '@/contexts/CartContext'
import { X, Minus, Plus, Trash2, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'
import CompanyDetailsModal from '@/components/CompanyDetailsModal'
import { toast } from 'sonner'
import { formatPrice, calculateTotalPrice } from '@/lib/utils'

interface CartSidebarProps {
  isOpen: boolean
  onClose: () => void
}

export function CartSidebar({ isOpen, onClose }: CartSidebarProps) {
  const { cart, updateQuantity, removeFromCart, getTotalItems } = useCart()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const totalItems = getTotalItems()
  const totalPrice = calculateTotalPrice(cart)

  const handleQuantityIncrease = (id: string, currentQuantity: number, priceOption?: string) => {
    updateQuantity(id, currentQuantity + 1, priceOption)
  }

  const handleQuantityDecrease = (id: string, currentQuantity: number, priceOption?: string) => {
    if (currentQuantity > 1) {
      updateQuantity(id, currentQuantity - 1, priceOption)
    }
  }

  const handleRemove = (id: string, name: string, priceOption?: string) => {
    removeFromCart(id, priceOption)
    toast.success('Product removed', {
      description: `${name} has been removed from your cart.`,
    })
  }

  const handleRequestQuotation = () => {
    if (cart.length === 0) {
      toast.error('Cart is empty', {
        description: 'Please add products to your cart before requesting a quotation.',
      })
      return
    }
    setIsModalOpen(true)
  }

  if (!isOpen) return null

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
        onClick={onClose}
      />

      {/* Sidebar */}
      <div className="fixed right-0 top-0 h-full w-full sm:w-[480px] bg-white shadow-2xl z-50 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <h2 className="text-lg font-bold">Shopping Cart</h2>
            <span className="text-sm text-gray-500">{totalItems} items</span>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="px-4 py-2 text-sm text-gray-600 border-b">
          Review your items and request a quotation when ready.
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <svg className="w-20 h-20 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <p className="text-gray-500 font-medium mb-2">Your cart is empty</p>
              <p className="text-sm text-gray-400 mb-4">Add products to get started</p>
              <Button variant="gradient" size="sm" onClick={onClose}>
                Continue Shopping
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              {cart.map((item, index) => (
                <div key={`${item.id}-${item.priceOption || 'default'}-${index}`} className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex gap-3">
                    {/* Product Image */}
                    <div className="flex-shrink-0 w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center">
                      <svg className="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                      </svg>
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-1">
                        <div className="flex-1 min-w-0 pr-2">
                          <h3 className="text-sm font-bold text-gray-900 line-clamp-2">
                            {item.name}
                          </h3>
                          <p className="text-xs text-gray-500">SKU: {item.id}</p>
                          {item.priceOption && (
                            <p className="text-xs font-medium text-primary mt-0.5">
                              {item.priceOption}
                            </p>
                          )}
                        </div>
                        <button
                          onClick={() => handleRemove(item.id, item.name, item.priceOption)}
                          className="text-gray-400 hover:text-red-500 transition-colors"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Quantity and Price */}
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-2 border rounded-lg">
                          <button
                            onClick={() => handleQuantityDecrease(item.id, item.quantity, item.priceOption)}
                            className="p-1 hover:bg-gray-100 transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="w-8 text-center text-sm font-semibold">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => handleQuantityIncrease(item.id, item.quantity, item.priceOption)}
                            className="p-1 hover:bg-gray-100 transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-bold text-primary">{formatPrice(item.price)}</div>
                          <div className="text-xs text-gray-500">
                            {(() => {
                              const numericPrice = parseFloat(item.price.replace(/[^\d.]/g, ''));
                              if (!isNaN(numericPrice) && item.quantity > 0) {
                                return `${formatPrice(`RM ${(numericPrice / item.quantity).toFixed(2)}`)} each`;
                              }
                              return '';
                            })()}
                          </div>
                        </div>
                      </div>

                      {/* View Product Link */}
                      <Link
                        href={`/product/${item.id}`}
                        className="inline-flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 mt-2"
                        onClick={onClose}
                      >
                        <ExternalLink className="w-3 h-3" />
                        View Product
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer Summary */}
        {cart.length > 0 && (
          <div className="border-t p-4 bg-gray-50">
            <div className="mb-4">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Items ({totalItems})</span>
                <span className="font-semibold">{formatPrice(`RM ${totalPrice}`)}</span>
              </div>
              <div className="flex justify-between text-base font-bold border-t pt-2">
                <span>Total</span>
                <span className="text-primary">{formatPrice(`RM ${totalPrice}`)}</span>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Final pricing will be provided in the quotation
              </p>
            </div>

            <Button
              variant="gradient"
              size="default"
              className="w-full mb-2 flex items-center justify-center gap-2"
              onClick={handleRequestQuotation}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              Request Quotation via WhatsApp
            </Button>

            <Button
              variant="outline"
              size="default"
              className="w-full"
              onClick={onClose}
            >
              Continue Shopping
            </Button>

            <div className="mt-3 space-y-1 text-xs text-gray-600">
              <div className="flex items-center gap-1">
                <span>•</span>
                <span>Free quotation and consultation</span>
              </div>
              <div className="flex items-center gap-1">
                <span>•</span>
                <span>Bulk pricing available</span>
              </div>
              <div className="flex items-center gap-1">
                <span>•</span>
                <span>Custom branding options</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Company Details Modal */}
      <CompanyDetailsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        cartItems={cart}
      />
    </>
  )
}
