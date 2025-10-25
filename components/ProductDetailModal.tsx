'use client';

import { useState, useEffect } from 'react';
import { Product } from '@/types/product';
import QuotationForm from './QuotationForm';

interface ProductDetailModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProductDetailModal({
  product,
  isOpen,
  onClose,
}: ProductDetailModalProps) {
  const [showQuotationForm, setShowQuotationForm] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <>
      {/* Modal Backdrop */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={handleBackdropClick}
      >
        {/* Modal Content */}
        <div className="flex items-center justify-center min-h-screen p-4">
          <div
            className={`bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl transform transition-all duration-300 ${
              isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
            >
              <svg
                className="w-6 h-6 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Product Image */}
            <div className="relative h-80 bg-gray-100">
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
                  <p className="text-lg font-semibold">{product.id}</p>
                  <p className="text-sm mt-2">Product Image Placeholder</p>
                </div>
              </div>
              {/* Category Badge */}
              <div className="absolute top-4 left-4">
                <span className="inline-block px-4 py-2 bg-white/90 backdrop-blur-sm text-[#0056D2] text-sm font-semibold rounded-full shadow-lg">
                  {product.category}
                </span>
              </div>
            </div>

            {/* Product Details */}
            <div className="p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                {product.name}
              </h2>

              <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                {product.description}
              </p>

              {/* Specifications */}
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Specifications
                </h3>
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-gray-700 leading-relaxed">
                    {product.specification}
                  </p>
                </div>
              </div>

              {/* Keywords */}
              {product.seoKeywords && product.seoKeywords.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    Keywords
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {product.seoKeywords.map((keyword, index) => (
                      <span
                        key={index}
                        className="inline-block px-4 py-2 bg-primary/10 text-primary text-sm font-semibold rounded-full hover:bg-primary/20 transition-colors"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Size and Price */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="text-sm text-gray-600 mb-1">Dimensions</div>
                  <div className="text-xl font-bold text-gray-900">
                    {product.size}
                  </div>
                </div>
                <div className="bg-primary/10 rounded-xl p-4">
                  <div className="text-sm text-gray-600 mb-1">Pricing</div>
                  <div className="text-xl font-bold text-[#0056D2]">
                    {product.price}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => setShowQuotationForm(true)}
                  className="flex-1 px-6 py-4 bg-primary text-white font-bold rounded-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
                >
                  Request Quotation
                </button>
                <button
                  onClick={onClose}
                  className="px-6 py-4 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quotation Form Modal */}
      {showQuotationForm && (
        <QuotationForm
          productName={product.name}
          isOpen={showQuotationForm}
          onClose={() => setShowQuotationForm(false)}
        />
      )}
    </>
  );
}
