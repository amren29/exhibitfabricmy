"use client";

import Link from "next/link";
import { HeroSlider } from "@/components/hero-slider";
import { CTABanner } from "@/components/cta-banner";
import { getFeaturedPortfolio } from "@/data/portfolio";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import productsData from "@/data/products.json";

export default function Home() {
  const featuredPortfolio = getFeaturedPortfolio(6);

  // Get one main product from each category, excluding "Other Services"
  const featuredProducts = productsData.categories
    .filter(category => category !== "Other Services")
    .map(category => {
      const categoryProducts = productsData.products.filter(
        product => product.category === category
      );
      // Return the first product from each category
      return categoryProducts[0];
    })
    .filter(Boolean); // Remove any undefined values

  return (
    <>
      {/* Hero Section */}
      <HeroSlider />

      {/* Products Preview */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Our Product Catalog
            </h2>
            <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
              From portable banner stands to complete exhibition booths, we have
              everything you need for a successful event.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <Link
                key={product.id}
                href={`/product/${product.id}`}
                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer group hover:scale-105"
              >
                {/* Product Image */}
                <div className="relative h-48 bg-gray-100 overflow-hidden">
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
                <div className="p-4">
                  <div className="mb-2">
                    <span className="inline-block px-2 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full">
                      {product.category}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-gray-900 mb-1.5 group-hover:text-[#0056D2] transition-colors line-clamp-1">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 text-xs mb-2 line-clamp-2">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-gray-500">
                      <span className="font-medium">Size:</span> {product.size.split(' ')[0]}
                    </div>
                    <button className="px-3 py-1.5 bg-primary text-white text-xs font-medium rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105">
                      View
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button variant="outline" size="lg" asChild>
              <Link href="/product">View All Products</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Short Introduction */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text Content */}
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-6">
                Your Brand, <span className="text-primary">Upgraded</span>
              </h2>
              <div className="max-w-none text-muted-foreground">
                <p className="mb-4 text-sm">
                  At Exhibit Fabric, we specialize in creating stunning custom
                  trade show booths and premium fabric printing solutions that
                  make your brand stand out at any event.
                </p>
                <p className="mb-4 text-sm">
                  With cutting-edge printing technology and expert craftsmanship,
                  we deliver high-quality exhibition displays that capture
                  attention and drive engagement.
                </p>
                <p className="mb-4 text-sm">
                  Serving clients across Kuala Lumpur, Kota Kinabalu, and Kuching, we're committed
                  to excellence in every project, from portable banner stands to
                  large-format LED lightbox walls.
                </p>
              </div>
              <div className="mt-6">
                <Button size="lg" asChild>
                  <Link href="/about">Learn More About Us</Link>
                </Button>
              </div>
            </div>

            {/* Right: Image */}
            <div className="relative aspect-[4/3] overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                {/* Placeholder - Replace with actual image */}
                <div className="text-center text-gray-400 p-8">
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
                  <p className="text-sm font-medium">Hero Image</p>
                  <p className="text-xs mt-2">Add your brand showcase image here</p>
                </div>
              </div>
              {/* Uncomment and replace with your actual image */}
              {/* <Image
                src="/images/hero-brand.jpg"
                alt="Exhibit Fabric Brand Showcase"
                fill
                className="object-cover"
              /> */}
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Preview */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Our Recent Work
            </h2>
            <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
              See how we've helped brands create memorable experiences at
              exhibitions and events.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredPortfolio.map((item) => (
              <div
                key={item.id}
                className="group relative aspect-[4/3] overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow"
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                    <h3 className="font-semibold text-base mb-1">
                      {item.title}
                    </h3>
                    <p className="text-xs text-white/80">{item.category}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button variant="outline" size="lg" asChild>
              <Link href="/portfolio">View Full Gallery</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Global CTA */}
      <CTABanner />
    </>
  );
}
