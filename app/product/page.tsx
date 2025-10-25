'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Product } from '@/types/product';
import productsData from '@/data/products.json';
import { parsePriceOptions } from '@/lib/utils';
import { useCart } from '@/contexts/CartContext';
import { toast } from 'sonner';

export default function ProductPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(12);
  const { addToCart, openCart } = useCart();

  const categories = ['All', ...productsData.categories];

  // Count products per category
  const categoryCounts = useMemo(() => {
    const counts: { [key: string]: number } = { All: productsData.products.length };
    productsData.categories.forEach((category) => {
      counts[category] = productsData.products.filter(
        (p) => p.category === category
      ).length;
    });
    return counts;
  }, []);

  const filteredProducts = useMemo(() => {
    if (selectedCategory === 'All') {
      return productsData.products;
    }
    return productsData.products.filter(
      (product) => product.category === selectedCategory
    );
  }, [selectedCategory]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setIsMobileFilterOpen(false);
    setCurrentPage(1); // Reset to page 1 when category changes
  };

  const handleProductsPerPageChange = (value: number) => {
    setProductsPerPage(value);
    setCurrentPage(1); // Reset to page 1 when changing items per page
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddToCart = (product: Product, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const priceOptions = parsePriceOptions(product.price);
    const firstPrice = priceOptions[0]?.value || product.price;

    addToCart({
      id: product.id,
      name: product.name,
      category: product.category,
      price: firstPrice,
      image: '',
      priceOption: priceOptions[0]?.label,
    });

    toast.success('Added to cart', {
      description: `${product.name} has been added to your cart.`,
    });

    openCart();
  };

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      {/* Header Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="text-center mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Our Products
          </h1>
          <p className="text-sm text-gray-600 max-w-2xl mx-auto">
            Explore our comprehensive range of exhibition and display solutions.
            From fabric backdrops to lightbox systems, we have everything you need.
          </p>
        </div>
      </div>

      {/* Main Content - Sidebar + Products */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Mobile Filter Toggle Button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
              className="w-full flex items-center justify-between px-4 py-3 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow"
            >
              <span className="flex items-center gap-2 text-gray-900 text-sm font-semibold">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                  />
                </svg>
                Filter by Category
              </span>
              <svg
                className={`w-5 h-5 transition-transform ${
                  isMobileFilterOpen ? 'rotate-180' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          </div>

          {/* Left Sidebar Filter */}
          <aside
            className={`lg:block lg:w-64 flex-shrink-0 ${
              isMobileFilterOpen ? 'block' : 'hidden'
            }`}
          >
            <div className="bg-white rounded-xl shadow-lg p-4 sticky top-4">
              {/* Filter Header */}
              <div className="mb-5">
                <h2 className="text-lg font-bold text-gray-900 mb-1">
                  Categories
                </h2>
                <p className="text-xs text-gray-600">
                  {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found
                </p>
              </div>

              {/* Category List */}
              <div className="space-y-1.5">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => handleCategorySelect(category)}
                    className={`w-full text-left px-3 py-2.5 rounded-lg font-medium transition-all duration-200 ${
                      selectedCategory === category
                        ? 'bg-primary text-white shadow-md'
                        : 'bg-gray-50 text-gray-700 hover:bg-gray-100 hover:shadow-sm'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs">{category}</span>
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full ${
                          selectedCategory === category
                            ? 'bg-white/20 text-white'
                            : 'bg-gray-200 text-gray-600'
                        }`}
                      >
                        {categoryCounts[category]}
                      </span>
                    </div>
                  </button>
                ))}
              </div>

              {/* Additional Info */}
              <div className="mt-6 pt-5 border-t border-gray-200">
                <div className="bg-gray-50 rounded-lg p-3">
                  <h3 className="text-xs font-bold text-gray-900 mb-1">
                    Need Help?
                  </h3>
                  <p className="text-xs text-gray-600 mb-2">
                    Can't find what you're looking for? Contact us for custom solutions.
                  </p>
                  <button className="w-full px-3 py-2 bg-primary text-white text-xs font-semibold rounded-lg hover:shadow-lg transition-all duration-300">
                    Contact Us
                  </button>
                </div>
              </div>
            </div>
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Results Info and Products Per Page Selector */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div className="text-sm text-gray-600">
                Showing {startIndex + 1}-{Math.min(endIndex, filteredProducts.length)} of {filteredProducts.length} products
              </div>
              <div className="flex items-center gap-3">
                <label htmlFor="perPage" className="text-sm text-gray-700 font-medium">
                  Products per page:
                </label>
                <select
                  id="perPage"
                  value={productsPerPage}
                  onChange={(e) => handleProductsPerPageChange(Number(e.target.value))}
                  className="px-4 py-2 border border-gray-300 rounded-lg bg-white text-sm font-medium text-gray-700 hover:border-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                >
                  <option value={12}>12</option>
                  <option value={24}>24</option>
                  <option value={36}>36</option>
                  <option value={48}>48</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {paginatedProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 group hover:scale-105"
                >
                  <Link href={`/product/${product.id}`}>
                    {/* Product Image */}
                    <div className="relative h-48 bg-gray-100 overflow-hidden cursor-pointer">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-gray-400 text-center p-4">
                          <svg
                            className="w-16 h-16 mx-auto mb-2 opacity-50"
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
                          <p className="text-xs font-medium">{product.id}</p>
                        </div>
                      </div>
                      {/* Gradient overlay on hover */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>

                    {/* Product Info */}
                    <div className="p-4 cursor-pointer">
                      <div className="mb-2">
                        <span className="inline-block px-2 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full">
                          {product.category}
                        </span>
                      </div>
                      <h3 className="text-sm font-bold text-gray-900 mb-1 group-hover:text-[#0056D2] transition-colors line-clamp-1">
                        {product.name}
                      </h3>
                      <p className="text-gray-600 text-xs mb-2 line-clamp-2">
                        {product.description}
                      </p>
                      <div className="mb-2">
                        <div className="text-sm font-bold text-primary">
                          {parsePriceOptions(product.price).length > 1 && (
                            <span className="text-xs font-normal text-gray-500 mr-1">From</span>
                          )}
                          {parsePriceOptions(product.price)[0]?.value || product.price}
                        </div>
                      </div>
                    </div>
                  </Link>

                  {/* Action Buttons */}
                  <div className="px-4 pb-4 flex gap-2">
                    <Link
                      href={`/product/${product.id}`}
                      className="flex-1 px-2.5 py-1.5 bg-primary text-white text-xs font-medium rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105 text-center"
                    >
                      View
                    </Link>
                    <button
                      onClick={(e) => handleAddToCart(product, e)}
                      className="flex-1 px-2.5 py-1.5 border-2 border-blue-600 text-blue-600 bg-white text-xs font-medium rounded-lg hover:bg-blue-50 transition-all duration-300 hover:scale-105"
                    >
                      Quote
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* No Results */}
            {filteredProducts.length === 0 && (
              <div className="text-center py-20">
                <div className="inline-block p-8 bg-white rounded-2xl shadow-md">
                  <svg
                    className="w-16 h-16 mx-auto mb-4 text-gray-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                    />
                  </svg>
                  <p className="text-gray-500 text-lg font-medium">
                    No products found in this category.
                  </p>
                  <p className="text-gray-400 text-sm mt-2">
                    Try selecting a different category
                  </p>
                </div>
              </div>
            )}

            {/* Pagination Controls */}
            {filteredProducts.length > 0 && totalPages > 1 && (
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                {/* Page Info */}
                <div className="text-sm text-gray-600">
                  Page {currentPage} of {totalPages}
                </div>

                {/* Pagination Buttons */}
                <div className="flex items-center gap-2">
                  {/* Previous Button */}
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                      currentPage === 1
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-white text-gray-700 hover:bg-primary hover:text-white shadow-md hover:shadow-lg'
                    }`}
                  >
                    Previous
                  </button>

                  {/* Page Numbers */}
                  <div className="hidden sm:flex items-center gap-2">
                    {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                      let pageNum;
                      if (totalPages <= 5) {
                        pageNum = i + 1;
                      } else if (currentPage <= 3) {
                        pageNum = i + 1;
                      } else if (currentPage >= totalPages - 2) {
                        pageNum = totalPages - 4 + i;
                      } else {
                        pageNum = currentPage - 2 + i;
                      }

                      return (
                        <button
                          key={pageNum}
                          onClick={() => handlePageChange(pageNum)}
                          className={`w-10 h-10 rounded-lg font-medium text-sm transition-all ${
                            currentPage === pageNum
                              ? 'bg-primary text-white shadow-lg'
                              : 'bg-white text-gray-700 hover:bg-gray-100 shadow-md'
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                  </div>

                  {/* Next Button */}
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                      currentPage === totalPages
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-white text-gray-700 hover:bg-primary hover:text-white shadow-md hover:shadow-lg'
                    }`}
                  >
                    Next
                  </button>
                </div>

                {/* Jump to Page (Mobile) */}
                <div className="sm:hidden flex items-center gap-2">
                  <span className="text-sm text-gray-600">Go to:</span>
                  <select
                    value={currentPage}
                    onChange={(e) => handlePageChange(Number(e.target.value))}
                    className="px-3 py-2 border border-gray-300 rounded-lg bg-white text-sm font-medium text-gray-700"
                  >
                    {Array.from({ length: totalPages }, (_, i) => (
                      <option key={i + 1} value={i + 1}>
                        Page {i + 1}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
