'use client'

import { useState, useEffect, useMemo } from 'react'
import { X, Search as SearchIcon } from 'lucide-react'
import Link from 'next/link'
import productsData from '@/data/products.json'
import { Product } from '@/types/product'
import { parsePriceOptions } from '@/lib/utils'

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')

  // Reset search when modal closes
  useEffect(() => {
    if (!isOpen) {
      setSearchQuery('')
      setSelectedCategory('All')
    }
  }, [isOpen])

  // Search products
  const filteredProducts = useMemo(() => {
    let results = productsData.products as Product[]

    // Filter by category
    if (selectedCategory !== 'All') {
      results = results.filter(product => product.category === selectedCategory)
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim()
      results = results.filter(product => {
        // Search by product name
        if (product.name.toLowerCase().includes(query)) return true

        // Search by product code (ID)
        if (product.id.toLowerCase().includes(query)) return true

        // Search by description
        if (product.description?.toLowerCase().includes(query)) return true

        // Search by category
        if (product.category.toLowerCase().includes(query)) return true

        // Search by keywords
        if (product.seoKeywords && product.seoKeywords.length > 0) {
          const keywords = product.seoKeywords.join(' ').toLowerCase()
          if (keywords.includes(query)) return true
        }

        return false
      })
    }

    return results.slice(0, 50) // Limit to 50 results
  }, [searchQuery, selectedCategory])

  if (!isOpen) return null

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/60 z-[100] transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Search Modal */}
      <div className="fixed top-0 left-1/2 transform -translate-x-1/2 w-full max-w-3xl z-[110] p-4">
        <div className="bg-white rounded-2xl shadow-2xl mt-20 max-h-[80vh] flex flex-col">
          {/* Header */}
          <div className="p-4 border-b">
            <div className="flex items-center gap-3 mb-3">
              <SearchIcon className="w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by product name, code, or keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 outline-none text-base"
                autoFocus
              />
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Close search"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Category Filter */}
            <div className="flex gap-2 overflow-x-auto pb-2">
              <button
                onClick={() => setSelectedCategory('All')}
                className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === 'All'
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All
              </button>
              {productsData.categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                    selectedCategory === category
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Results */}
          <div className="flex-1 overflow-y-auto p-4">
            {searchQuery.trim() === '' && selectedCategory === 'All' ? (
              <div className="text-center py-12 text-gray-500">
                <SearchIcon className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                <p className="text-sm">Start typing to search products...</p>
                <p className="text-xs text-gray-400 mt-1">
                  Search by name, product code, or keywords
                </p>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <SearchIcon className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                <p className="text-sm">No products found</p>
                <p className="text-xs text-gray-400 mt-1">
                  Try different keywords or categories
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                <p className="text-xs text-gray-500 mb-3">
                  Found {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
                </p>
                {filteredProducts.map((product) => (
                  <Link
                    key={product.id}
                    href={`/product/${product.id}`}
                    onClick={onClose}
                    className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors group"
                  >
                    {/* Product Image Placeholder */}
                    <div className="w-16 h-16 bg-gray-100 rounded flex items-center justify-center flex-shrink-0">
                      <span className="text-xs text-gray-400 font-medium text-center px-1">
                        {product.id}
                      </span>
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-semibold text-gray-900 group-hover:text-primary transition-colors line-clamp-1">
                        {product.name}
                      </h3>
                      <p className="text-xs text-gray-500 line-clamp-1 mt-0.5">
                        {product.description}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs px-2 py-0.5 bg-primary/10 text-primary rounded-full">
                          {product.category}
                        </span>
                        <span className="text-xs text-gray-400">
                          {product.id}
                        </span>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="text-right flex-shrink-0">
                      <div className="text-sm font-bold text-primary">
                        {parsePriceOptions(product.price).length > 1 && (
                          <span className="text-xs font-normal text-gray-500 mr-1">From</span>
                        )}
                        {parsePriceOptions(product.price)[0]?.value || product.price}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
