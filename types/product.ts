export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  specification: string;
  size: string;
  price: string;
  image: string;
  weight?: string;
  seoKeywords: string[];
}

export interface ProductData {
  categories: string[];
  products: Product[];
}

export interface Quotation {
  id?: string;
  name: string;
  email: string;
  phone: string;
  product_name: string;
  message: string;
  file_url?: string;
  created_at?: string;
  status?: 'pending' | 'processing' | 'completed';
}

export interface QuotationFormData {
  name: string;
  email: string;
  phone: string;
  product_name: string;
  message: string;
  file?: File;
}
