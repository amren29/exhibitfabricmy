'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useCart } from '@/contexts/CartContext'
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import CompanyDetailsModal from '@/components/CompanyDetailsModal'
import { toast } from 'sonner'
import { formatPrice, calculateTotalPrice } from '@/lib/utils'

export default function CartPage() {
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

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-white rounded-2xl shadow-lg p-10">
              <div className="mb-5">
                <ShoppingBag className="w-20 h-20 mx-auto text-gray-300" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-3">Your Cart is Empty</h1>
              <p className="text-sm text-gray-600 mb-6">
                Start adding products to your cart to request a quotation.
              </p>
              <Link href="/product">
                <Button variant="gradient" size="default" className="gap-2 text-sm">
                  <ArrowLeft className="w-4 h-4" />
                  Browse Products
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6">
          <Link
            href="/product"
            className="inline-flex items-center text-xs text-gray-600 hover:text-primary font-medium transition-colors mb-3"
          >
            <ArrowLeft className="w-3.5 h-3.5 mr-1.5" />
            Continue Shopping
          </Link>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            Shopping Cart
          </h1>
          <p className="text-sm text-gray-600 mt-2">
            {totalItems} {totalItems === 1 ? 'item' : 'items'} in your cart
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="p-4">
                  <div className="flex gap-4">
                    {/* Product Image */}
                    <div className="flex-shrink-0">
                      <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center">
                        <ShoppingBag className="w-8 h-8 text-gray-300" />
                      </div>
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-1.5">
                        <div>
                          <Link
                            href={`/product/${item.id}`}
                            className="text-base font-bold text-gray-900 hover:text-primary transition-colors line-clamp-2"
                          >
                            {item.name}
                          </Link>
                          <p className="text-xs text-gray-500 mt-0.5">{item.category}</p>
                          {item.priceOption && (
                            <p className="text-xs font-medium text-primary mt-0.5">
                              {item.priceOption}
                            </p>
                          )}
                        </div>
                        <button
                          onClick={() => handleRemove(item.id, item.name, item.priceOption)}
                          className="text-red-500 hover:text-red-700 transition-colors p-1.5"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Size and Specification */}
                      <div className="text-xs text-gray-600 mb-2 space-y-0.5">
                        {item.size && (
                          <p>
                            <span className="font-medium">Size:</span> {item.size}
                          </p>
                        )}
                        {item.specification && (
                          <p className="line-clamp-1">
                            <span className="font-medium">Spec:</span> {item.specification}
                          </p>
                        )}
                      </div>

                      {/* Price and Quantity Controls */}
                      <div className="flex items-center justify-between">
                        <div className="text-base font-bold text-primary">{formatPrice(item.price)}</div>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-2.5">
                          <button
                            onClick={() => handleQuantityDecrease(item.id, item.quantity, item.priceOption)}
                            className="w-7 h-7 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="w-10 text-center text-sm font-semibold text-gray-900">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => handleQuantityIncrease(item.id, item.quantity, item.priceOption)}
                            className="w-7 h-7 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Cart Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-5 sticky top-24">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Order Summary</h2>

              <div className="space-y-2.5 mb-5">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Total Items</span>
                  <span className="font-semibold">{totalItems}</span>
                </div>
                <div className="flex justify-between text-base font-bold pt-2.5 border-t">
                  <span>Total Price</span>
                  <span className="text-primary">{formatPrice(`RM ${totalPrice}`)}</span>
                </div>
                <div className="border-t pt-2.5">
                  <p className="text-xs text-gray-500">
                    Prices are indicative. Final quotation will be provided by our team.
                  </p>
                </div>
              </div>

              <Button
                variant="gradient"
                size="default"
                className="w-full text-sm"
                onClick={handleRequestQuotation}
              >
                Request Quotation
              </Button>

              <Link href="/product" className="block mt-3">
                <Button variant="outline" size="default" className="w-full text-sm">
                  Add More Products
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Company Details Modal */}
      <CompanyDetailsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        cartItems={cart}
      />
    </div>
  )
}
