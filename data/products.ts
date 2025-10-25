import { Product } from "@/types";

export const products: Product[] = [
  {
    id: "1",
    slug: "fabric-lightbox-display",
    name: "Fabric Lightbox Display",
    shortDescription:
      "Illuminated fabric displays that make your brand shine at any event.",
    description:
      "Our Fabric Lightbox Displays feature high-quality tension fabric graphics with LED backlighting. Perfect for trade shows, retail environments, and exhibitions. The lightweight aluminum frame ensures easy setup and portability while maintaining a professional appearance.",
    category: "Lightbox Displays",
    images: [
      "/products/fabric-lightbox-1.jpg",
      "/products/fabric-lightbox-2.jpg",
      "/products/fabric-lightbox-3.jpg",
    ],
    specifications: {
      material: "Premium Tension Fabric",
      frameType: "Aluminum with LED Backlighting",
      printMethod: "Dye Sublimation",
      sizes: ["2x3m", "3x4m", "4x6m", "Custom"],
    },
    priceRange: {
      min: 1500,
      max: 5000,
      currency: "MYR",
    },
    featured: true,
  },
  {
    id: "2",
    slug: "portable-exhibition-booth",
    name: "Portable Exhibition Booth",
    shortDescription:
      "Complete portable booth solution for maximum impact with minimal setup time.",
    description:
      "A complete exhibition booth package that includes backdrop, counter, lighting, and graphics. Designed for quick assembly without tools. Ideal for frequent exhibitors who need a professional presence at multiple events.",
    category: "Exhibition Booths",
    images: [
      "/products/portable-booth-1.jpg",
      "/products/portable-booth-2.jpg",
    ],
    specifications: {
      material: "Fabric & Aluminum",
      frameType: "Tool-free Modular System",
      printMethod: "Dye Sublimation",
      sizes: ["3x3m", "3x6m", "6x6m"],
    },
    priceRange: {
      min: 3000,
      max: 12000,
      currency: "MYR",
    },
    featured: true,
  },
  {
    id: "3",
    slug: "pop-up-banner-stand",
    name: "Pop-Up Banner Stand",
    shortDescription:
      "Retractable banner stands for portable, professional displays.",
    description:
      "High-quality retractable banner stands perfect for presentations, events, and retail displays. Features premium fabric or vinyl material with crisp, vibrant printing. Easy to set up in seconds and comes with a carrying case.",
    category: "Banner Stands",
    images: ["/products/banner-stand-1.jpg", "/products/banner-stand-2.jpg"],
    specifications: {
      material: "Premium Vinyl or Fabric",
      frameType: "Retractable Aluminum Base",
      printMethod: "UV or Dye Sublimation",
      sizes: ["80x200cm", "100x200cm", "120x200cm"],
    },
    priceRange: {
      min: 200,
      max: 600,
      currency: "MYR",
    },
    featured: true,
  },
  {
    id: "4",
    slug: "custom-fabric-backdrop",
    name: "Custom Fabric Backdrop",
    shortDescription:
      "Seamless fabric backdrops for stunning visual presentations.",
    description:
      "Create an impressive background for your booth or event with our seamless fabric backdrops. Printed using dye sublimation for vibrant, long-lasting colors. Wrinkle-resistant and machine washable for easy maintenance.",
    category: "Backdrops",
    images: ["/products/backdrop-1.jpg", "/products/backdrop-2.jpg"],
    specifications: {
      material: "Stretch Fabric",
      frameType: "Tension Frame System",
      printMethod: "Dye Sublimation",
      sizes: ["2x2m", "3x3m", "4x3m", "Custom"],
    },
    priceRange: {
      min: 800,
      max: 3000,
      currency: "MYR",
    },
    featured: false,
  },
  {
    id: "5",
    slug: "modular-exhibition-system",
    name: "Modular Exhibition System",
    shortDescription:
      "Flexible modular system that adapts to any booth configuration.",
    description:
      "Our modular exhibition system offers unlimited configuration possibilities. Build corner booths, linear displays, or custom layouts. The system is reusable and can be reconfigured for different events, providing excellent long-term value.",
    category: "Exhibition Booths",
    images: ["/products/modular-1.jpg", "/products/modular-2.jpg"],
    specifications: {
      material: "Aluminum & Fabric",
      frameType: "Modular Extrusion System",
      printMethod: "Dye Sublimation",
      sizes: ["Customizable"],
    },
    priceRange: {
      min: 5000,
      max: 20000,
      currency: "MYR",
    },
    featured: true,
  },
  {
    id: "6",
    slug: "fabric-counter-display",
    name: "Fabric Counter Display",
    shortDescription:
      "Portable counters with custom graphics for your booth.",
    description:
      "Professional display counters with vibrant fabric graphics. Perfect for product demonstrations, registration, or information distribution. Lightweight and portable with internal storage space.",
    category: "Counters",
    images: ["/products/counter-1.jpg", "/products/counter-2.jpg"],
    specifications: {
      material: "Fabric with Internal Structure",
      frameType: "Collapsible Frame",
      printMethod: "Dye Sublimation",
      sizes: ["Standard: 100x90x40cm"],
    },
    priceRange: {
      min: 400,
      max: 1200,
      currency: "MYR",
    },
    featured: false,
  },
  {
    id: "7",
    slug: "hanging-banner-display",
    name: "Hanging Banner Display",
    shortDescription:
      "Eye-catching overhead displays visible from across the hall.",
    description:
      "Make your booth stand out with hanging banner displays. These double-sided graphics are visible from all directions and help attendees locate your booth. Available in various shapes including circles, squares, and custom die-cuts.",
    category: "Hanging Displays",
    images: ["/products/hanging-1.jpg", "/products/hanging-2.jpg"],
    specifications: {
      material: "Lightweight Fabric",
      frameType: "Collapsible Frame with Rigging",
      printMethod: "Dye Sublimation Double-Sided",
      sizes: ["1x1m", "1.5x1.5m", "2x2m", "Custom Shapes"],
    },
    priceRange: {
      min: 600,
      max: 2500,
      currency: "MYR",
    },
    featured: false,
  },
  {
    id: "8",
    slug: "outdoor-event-tent",
    name: "Outdoor Event Tent",
    shortDescription:
      "Weather-resistant branded tents for outdoor exhibitions.",
    description:
      "Heavy-duty event tents with custom branding for outdoor events, markets, and exhibitions. Features weather-resistant fabric and a sturdy aluminum frame. Available with walls and optional accessories.",
    category: "Outdoor Displays",
    images: ["/products/tent-1.jpg", "/products/tent-2.jpg"],
    specifications: {
      material: "Weather-Resistant Polyester",
      frameType: "Heavy-Duty Aluminum",
      printMethod: "UV Digital Print",
      sizes: ["3x3m", "3x4.5m", "3x6m"],
    },
    priceRange: {
      min: 2000,
      max: 6000,
      currency: "MYR",
    },
    featured: true,
  },
  {
    id: "9",
    slug: "table-throw-cover",
    name: "Table Throw Cover",
    shortDescription: "Professional table covers with your custom branding.",
    description:
      "Transform standard tables into branded display surfaces with our custom table throws. Available in fitted or draped styles, these covers provide a polished, professional appearance for any event.",
    category: "Table Covers",
    images: ["/products/table-throw-1.jpg"],
    specifications: {
      material: "Polyester or Stretch Fabric",
      printMethod: "Dye Sublimation",
      sizes: ["4ft", "6ft", "8ft Tables"],
    },
    priceRange: {
      min: 150,
      max: 400,
      currency: "MYR",
    },
    featured: false,
  },
  {
    id: "10",
    slug: "led-lightbox-wall",
    name: "LED Lightbox Wall",
    shortDescription:
      "Large-format illuminated wall for maximum visual impact.",
    description:
      "Create a stunning focal point with our LED Lightbox Walls. These large-format displays feature edge-to-edge illumination and seamless graphics. Perfect for creating immersive brand experiences and photo opportunities.",
    category: "Lightbox Displays",
    images: ["/products/led-wall-1.jpg", "/products/led-wall-2.jpg"],
    specifications: {
      material: "Premium SEG Fabric",
      frameType: "Aluminum with LED System",
      printMethod: "Dye Sublimation",
      sizes: ["3x3m", "4x3m", "6x3m", "Custom"],
    },
    priceRange: {
      min: 4000,
      max: 15000,
      currency: "MYR",
    },
    featured: true,
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured);
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter((p) => p.category === category);
}
