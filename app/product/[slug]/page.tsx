'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Product } from '@/types/product';
import productsData from '@/data/products.json';
import { useCart } from '@/contexts/CartContext';
import { toast } from 'sonner';
import { ShoppingCart, Minus, Plus } from 'lucide-react';
import { formatPrice, parsePriceOptions, PriceOption } from '@/lib/utils';

export default function ProductDetailPage() {
  const params = useParams();
  const productId = params.slug as string;
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  // Find the product by ID
  const product = productsData.products.find((p) => p.id === productId);

  // Parse price options
  const priceOptions = product ? parsePriceOptions(product.price) : [];
  const [selectedPriceOption, setSelectedPriceOption] = useState<PriceOption>(
    priceOptions[0] || { label: 'Standard', value: 'RM 0.00', numericValue: 0 }
  );

  const handleQuantityIncrease = () => {
    setQuantity(prev => prev + 1);
  };

  const handleQuantityDecrease = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const handleAddToCart = () => {
    if (!product) return;

    // Add to cart multiple times based on quantity
    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: product.id,
        name: product.name,
        category: product.category,
        price: selectedPriceOption.value,
        image: product.image || '',
        size: product.size,
        specification: product.specification,
        priceOption: priceOptions.length > 1 ? selectedPriceOption.label : undefined,
      });
    }

    const optionText = priceOptions.length > 1 ? ` (${selectedPriceOption.label})` : '';
    toast.success('Product added to cart!', {
      description: `${quantity} × ${product.name}${optionText} added to your cart.`,
    });

    // Reset quantity to 1
    setQuantity(1);
  };

  // Get related products (5 products from same category, excluding current product)
  const relatedProducts = product
    ? productsData.products
        .filter((p) => p.category === product.category && p.id !== product.id)
        .slice(0, 5)
    : [];

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white rounded-2xl shadow-lg p-12">
            <svg
              className="w-20 h-20 mx-auto mb-6 text-gray-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Product Not Found</h1>
            <p className="text-gray-600 mb-8">
              The product you're looking for doesn't exist or has been removed.
            </p>
            <Link
              href="/product"
              className="inline-block px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300"
            >
              Back to Products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Back Button */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <Link
          href="/product"
          className="inline-flex items-center text-sm text-gray-600 hover:text-primary font-medium transition-colors"
        >
          <svg
            className="w-4 h-4 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Products
        </Link>
      </div>

      {/* Product Details */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 p-6 lg:p-8">
            {/* Product Image */}
            <div>
              <div className="sticky top-8">
                <div className="relative aspect-square bg-gray-100 rounded-xl overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-gray-400 text-center p-8">
                      <svg
                        className="w-32 h-32 mx-auto mb-4 opacity-50"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      <p className="text-lg font-medium">{product.id}</p>
                      <p className="text-sm mt-2">Product Image</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Product Info */}
            <div>
              {/* Category Badge */}
              <div className="mb-3">
                <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full">
                  {product.category}
                </span>
              </div>

              {/* Product Name */}
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                {product.name}
              </h1>

              {/* Description */}
              <div className="prose max-w-none text-muted-foreground mb-4">
                <p className="text-sm mb-0">{product.description}</p>
              </div>

              {/* Price */}
              <div className="mb-4 p-4 bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl border border-primary/20">
                <p className="text-xs text-muted-foreground mb-2 font-medium">Price</p>
                {priceOptions.length > 1 ? (
                  <div className="space-y-2">
                    {priceOptions.map((option) => (
                      <button
                        key={option.label}
                        onClick={() => setSelectedPriceOption(option)}
                        className={`w-full text-left p-2.5 rounded-lg border-2 transition-all ${
                          selectedPriceOption.label === option.label
                            ? 'border-primary bg-primary/10'
                            : 'border-gray-200 hover:border-primary/50'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-semibold text-gray-900">{option.label}</span>
                          <span className="text-base font-bold text-primary">{option.value}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                ) : (
                  <p className="text-lg font-bold text-primary">{selectedPriceOption.value}</p>
                )}
              </div>

              {/* Quantity Selector */}
              <div className="mb-4">
                <h2 className="text-lg font-bold text-gray-900 mb-3">Quantity</h2>
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleQuantityDecrease}
                    disabled={quantity <= 1}
                    className="w-10 h-10 rounded-lg border-2 border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="text-xl font-bold text-gray-900 min-w-[2.5rem] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={handleQuantityIncrease}
                    className="w-10 h-10 rounded-lg border-2 border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Specifications Section */}
              <div className="mb-4">
                <h2 className="text-lg font-bold text-gray-900 mb-3">Specifications</h2>
                <div className="bg-gray-50 rounded-xl p-4 space-y-2.5">
                  {/* Size */}
                  <div className="flex items-start">
                    <svg
                      className="w-4 h-4 text-primary mr-2 flex-shrink-0 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    <div className="text-sm">
                      <span className="font-semibold text-gray-900">Size: </span>
                      <span className="text-muted-foreground">{product.size}</span>
                    </div>
                  </div>

                  {/* Specification Details */}
                  <div className="flex items-start">
                    <svg
                      className="w-4 h-4 text-primary mr-2 flex-shrink-0 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                      />
                    </svg>
                    <div className="text-sm">
                      <span className="font-semibold text-gray-900">Details: </span>
                      <span className="text-muted-foreground">{product.specification}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Features Section */}
              {product.features && product.features.length > 0 && (
                <div className="mb-4">
                  <h2 className="text-lg font-bold text-gray-900 mb-3">Key Features</h2>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <svg
                          className="w-4 h-4 text-primary mr-2 flex-shrink-0 mt-0.5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* CTA Buttons */}
              <div className="flex flex-col gap-2.5">
                <button
                  onClick={handleAddToCart}
                  className="w-full px-5 py-2.5 bg-primary text-white text-center text-sm font-semibold rounded-lg hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <ShoppingCart className="w-4 h-4" />
                  Add to Cart
                </button>
                <Link
                  href="/contact"
                  className="w-full px-5 py-2.5 bg-white border-2 border-primary text-primary text-center text-sm font-semibold rounded-lg hover:bg-primary hover:text-white transition-all duration-300"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">Related Products</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Other products in the {product.category} category
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5">
            {relatedProducts.map((relatedProduct) => (
              <Link
                key={relatedProduct.id}
                href={`/product/${relatedProduct.id}`}
                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 group hover:scale-105"
              >
                {/* Product Image */}
                <div className="relative h-40 bg-gray-100 overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-gray-400 text-center p-4">
                      <svg
                        className="w-12 h-12 mx-auto mb-1 opacity-50"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      <p className="text-xs font-medium">{relatedProduct.id}</p>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Product Info */}
                <div className="p-4">
                  <h3 className="text-sm font-bold text-gray-900 mb-1 group-hover:text-primary transition-colors line-clamp-2">
                    {relatedProduct.name}
                  </h3>
                  <p className="text-xs text-gray-600 line-clamp-1 mb-2">
                    {relatedProduct.size}
                  </p>
                  <p className="text-sm font-semibold text-primary">
                    {relatedProduct.price.split(' ')[0]} {relatedProduct.price.split(' ')[1]}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Global CTA Section */}
      <section className="py-16 md:py-24 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Make Your Brand Stand Out?
          </h2>
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
            Get a custom quotation for your next exhibition or event. Our team is ready
            to bring your vision to life.
          </p>
          <Link
            href="/contact"
            className="inline-block px-8 py-4 bg-white text-primary font-semibold rounded-lg hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Request a Quotation
          </Link>
        </div>
      </section>
    </div>
  );
}
