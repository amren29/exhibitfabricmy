"use client";

import { useState } from "react";
import { Metadata } from "next";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { portfolioItems } from "@/data/portfolio";
import { motion } from "framer-motion";

export default function PortfolioPage() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  const slides = portfolioItems.map((item) => ({
    src: item.image,
    title: item.title,
    description: item.description,
  }));

  const openLightbox = (index: number) => {
    setPhotoIndex(index);
    setLightboxOpen(true);
  };

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-2xl md:text-3xl font-bold mb-4">
            Our Gallery
          </h1>
          <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
            Explore our showcase of successful exhibition projects and custom
            booth installations.
          </p>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {portfolioItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="group relative aspect-[4/3] overflow-hidden rounded-lg shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer"
                onClick={() => openLightbox(index)}
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                    <h3 className="font-semibold text-base mb-1.5">
                      {item.title}
                    </h3>
                    <p className="text-xs text-white/90 mb-1.5">
                      {item.category}
                    </p>
                    {item.client && (
                      <p className="text-xs text-white/75">
                        Client: {item.client}
                      </p>
                    )}
                    {item.tags && (
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {item.tags.map((tag, i) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 bg-white/20 backdrop-blur-sm text-xs rounded"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        index={photoIndex}
        slides={slides}
      />
    </>
  );
}
