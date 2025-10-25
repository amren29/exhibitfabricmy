export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  shortDescription: string;
  category: string;
  images: string[];
  specifications: {
    material?: string;
    frameType?: string;
    printMethod?: string;
    sizes?: string[];
    [key: string]: string | string[] | undefined;
  };
  priceRange?: {
    min: number;
    max: number;
    currency: string;
  };
  featured: boolean;
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  image: string;
  description?: string;
  client?: string;
  year?: string;
  tags?: string[];
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
  file?: File;
}

export interface QuotationFormData {
  productName: string;
  customerName: string;
  email: string;
  phone: string;
  message: string;
  quantity?: number;
  file?: File;
}

export interface ContactSubmission extends Omit<ContactFormData, "file"> {
  id: string;
  createdAt: string;
  fileUrl?: string;
  status: "new" | "read" | "replied";
}

export interface QuotationSubmission extends Omit<QuotationFormData, "file"> {
  id: string;
  createdAt: string;
  fileUrl?: string;
  status: "new" | "processing" | "quoted" | "completed";
}

export interface NavLink {
  label: string;
  href: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}
