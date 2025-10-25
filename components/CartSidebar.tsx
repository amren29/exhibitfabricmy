'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useCart } from '@/contexts/CartContext'
import { X, Minus, Plus, Trash2, ExternalLink, ShoppingCart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import CompanyDetailsModal from '@/components/CompanyDetailsModal'
import { toast } from 'sonner'
import { formatPrice, calculateTotalPrice } from '@/lib/utils'

interface CartSidebarProps {
  isOpen: boolean
  onClose: () => void
}

export function CartSidebar({ isOpen, onClose }: CartSidebarProps) {
  const { cart, updateQuantity, removeFromCart, getTotalItems, clearCart } = useCart()
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
        <div className="flex-1 overflow-y-auto p-4">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingCart className="w-20 h-20 text-gray-300 mb-4" strokeWidth={1.5} />
              <p className="text-gray-500 font-medium mb-2">Your cart is empty</p>
              <p className="text-sm text-gray-400 mb-4">Add products to get started</p>
              <Button variant="gradient" size="sm" onClick={onClose}>
                Continue Shopping
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map((item, index) => (
                <div key={`${item.id}-${item.priceOption || 'default'}-${index}`} className="flex gap-3 pb-4 border-b border-gray-200 last:border-b-0">
                  {/* Product Image */}
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-gray-100 rounded flex items-center justify-center overflow-hidden">
                      {item.image ? (
                        <Image src={item.image} alt={item.name} width={64} height={64} className="object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-100">
                          <span className="text-xs text-gray-400 font-medium">{item.id}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 min-w-0">
                    <div className="mb-2">
                      <h3 className="text-sm font-bold text-gray-900 line-clamp-2 mb-0.5">
                        {item.name}
                      </h3>
                      <p className="text-xs text-gray-500">SKU: {item.id}</p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2 mb-2">
                      <button
                        onClick={() => handleQuantityDecrease(item.id, item.quantity, item.priceOption)}
                        className="w-6 h-6 rounded border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-10 text-center text-sm font-semibold">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => handleQuantityIncrease(item.id, item.quantity, item.priceOption)}
                        className="w-6 h-6 rounded border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    {/* View Product Link */}
                    <Link
                      href={`/product/${item.id}`}
                      className="inline-flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800"
                      onClick={onClose}
                    >
                      <ExternalLink className="w-3 h-3" />
                      View Product
                    </Link>
                  </div>

                  {/* Price and Remove */}
                  <div className="flex flex-col items-end justify-between">
                    <button
                      onClick={() => handleRemove(item.id, item.name, item.priceOption)}
                      className="text-gray-400 hover:text-red-500 transition-colors"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <div className="text-right">
                      <div className="text-base font-bold text-gray-900">{formatPrice(item.price)}</div>
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
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer Summary */}
        {cart.length > 0 && (
          <div className="border-t p-4 bg-white">
            <div className="mb-4">
              <div className="flex justify-between items-center text-sm mb-3">
                <span className="text-gray-600">Items ({totalItems})</span>
                <span className="font-semibold text-gray-900">{formatPrice(`RM ${totalPrice}`)}</span>
              </div>
              <div className="flex justify-between items-center border-t pt-3 mb-2">
                <span className="text-base font-bold text-gray-900">Total</span>
                <span className="text-lg font-bold text-gray-900">{formatPrice(`RM ${totalPrice}`)}</span>
              </div>
              <p className="text-xs text-gray-500">
                Final pricing will be provided in the quotation
              </p>
            </div>

            <button
              onClick={handleRequestQuotation}
              className="w-full mb-2 px-4 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg flex items-center justify-center gap-2 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              Request Quotation via WhatsApp
            </button>

            <div className="flex gap-2 mb-4">
              <button
                onClick={onClose}
                className="flex-1 px-4 py-3 bg-white hover:bg-gray-50 text-gray-900 font-medium rounded-lg border border-gray-300 transition-colors"
              >
                Continue Shopping
              </button>
              <button
                onClick={() => {
                  if (window.confirm('Are you sure you want to clear your cart?')) {
                    clearCart()
                    toast.success('Cart cleared successfully')
                  }
                }}
                className="px-4 py-3 bg-white hover:bg-red-50 text-red-600 font-medium rounded-lg border border-gray-300 transition-colors"
                aria-label="Clear cart"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-1 text-xs text-gray-600">
              <div className="flex items-center gap-1.5">
                <span>•</span>
                <span>Free quotation and consultation</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span>•</span>
                <span>Bulk pricing available</span>
              </div>
              <div className="flex items-center gap-1.5">
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
