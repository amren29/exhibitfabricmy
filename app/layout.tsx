import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { CartProvider } from "@/contexts/CartContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Exhibit Fabric - Custom Trade Show Booths & Fabric Printing",
  description:
    "Premium custom trade show booths and fabric printing services across Malaysia. Serving Kuala Lumpur, Kota Kinabalu & Kuching.",
  keywords: [
    "trade show booths",
    "fabric printing",
    "exhibition booths",
    "custom booths",
    "Kuala Lumpur",
    "Kota Kinabalu",
    "Kuching",
    "Malaysia",
  ],
  authors: [{ name: "Exhibit Fabric" }],
  openGraph: {
    title: "Exhibit Fabric - Custom Trade Show Booths",
    description: "Premium custom trade show booths and fabric printing services across Malaysia",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={`${inter.className} antialiased flex flex-col min-h-screen`}>
        <CartProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <Toaster richColors position="top-right" />
        </CartProvider>
      </body>
    </html>
  );
}
