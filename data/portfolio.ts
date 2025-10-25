import { PortfolioItem } from "@/types";

export const portfolioItems: PortfolioItem[] = [
  {
    id: "1",
    title: "Tech Summit 2024 Main Stage",
    category: "Exhibition Booth",
    image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&h=600&fit=crop",
    description:
      "Complete booth design and fabrication for a major technology conference featuring LED lightbox walls and interactive displays.",
    client: "TechCorp International",
    year: "2024",
    tags: ["LED Lightbox", "Modular System", "Large Format"],
  },
  {
    id: "2",
    title: "Healthcare Expo Corner Booth",
    category: "Exhibition Booth",
    image: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=800&h=600&fit=crop",
    description:
      "Custom corner booth with fabric graphics and integrated meeting space for a healthcare company.",
    client: "MediCare Solutions",
    year: "2024",
    tags: ["Corner Booth", "Fabric Graphics", "Custom Design"],
  },
  {
    id: "3",
    title: "Automotive Trade Show Display",
    category: "Exhibition Booth",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop",
    description:
      "Sleek, modern booth featuring vehicle display platform and interactive kiosks.",
    client: "Premium Auto Group",
    year: "2023",
    tags: ["Trade Show", "Modern Design", "Interactive"],
  },
  {
    id: "4",
    title: "Food & Beverage Festival Tent",
    category: "Outdoor Display",
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&h=600&fit=crop",
    description:
      "Branded event tent with custom printing for a multi-day food festival.",
    client: "Gourmet Foods Co.",
    year: "2024",
    tags: ["Outdoor", "Event Tent", "Custom Branding"],
  },
  {
    id: "5",
    title: "Education Fair Island Booth",
    category: "Exhibition Booth",
    image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&h=600&fit=crop",
    description:
      "Open island booth design with hanging banners and information kiosks for a university.",
    client: "National University",
    year: "2023",
    tags: ["Island Booth", "Hanging Banners", "Educational"],
  },
  {
    id: "6",
    title: "Retail Pop-Up Store",
    category: "Retail Display",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop",
    description:
      "Temporary retail environment with fabric backdrops and product display units.",
    client: "Fashion Brand X",
    year: "2024",
    tags: ["Retail", "Pop-Up", "Fabric Backdrop"],
  },
  {
    id: "7",
    title: "Banking Industry Conference",
    category: "Exhibition Booth",
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&h=600&fit=crop",
    description:
      "Professional booth with meeting areas and digital displays for a financial services company.",
    client: "Global Bank Ltd.",
    year: "2023",
    tags: ["Corporate", "Professional", "Meeting Space"],
  },
  {
    id: "8",
    title: "Beauty & Cosmetics Showcase",
    category: "Exhibition Booth",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
    description:
      "Elegant booth design with lightbox displays and product demonstration areas.",
    client: "Luxury Cosmetics",
    year: "2024",
    tags: ["Lightbox", "Beauty", "Product Display"],
  },
];

export function getPortfolioByCategory(category: string): PortfolioItem[] {
  return portfolioItems.filter((item) => item.category === category);
}

export function getFeaturedPortfolio(limit: number = 6): PortfolioItem[] {
  return portfolioItems.slice(0, limit);
}
