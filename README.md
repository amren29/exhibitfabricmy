# Exhibit Fabric - Corporate Website

A modern, production-ready corporate website for **Exhibit Fabric**, a company specializing in custom trade show booths and fabric printing. Serving clients across Kuala Lumpur, Kota Kinabalu, and Kuching.

![Next.js](https://img.shields.io/badge/Next.js-15-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3-38bdf8)
![Supabase](https://img.shields.io/badge/Supabase-Enabled-3ecf8e)

## Features

### 🎨 Design & UX
- Modern, clean, and professional design
- Fully responsive (mobile, tablet, desktop)
- Smooth animations with Framer Motion
- Gradient accent colors and professional typography
- Custom brand colors (#0056D2 primary)

### 📄 Pages
- **Home**: Hero slider, product preview, company intro, portfolio preview, CTA banner
- **About**: Company story, mission statement, key highlights
- **Products**: Complete catalog with 10 product categories
- **Product Details**: Individual pages with image carousel, specifications, and quotation modal
- **Portfolio**: Lightbox gallery of past projects
- **Contact**: Contact form with validation
- **Admin**: Dashboard to view form submissions

### 🛠 Technical Features
- Next.js 15 with App Router
- TypeScript for type safety
- TailwindCSS for styling
- Shadcn/UI components
- Framer Motion animations
- Embla Carousel for image sliders
- React Hook Form + Zod validation
- Supabase for database
- Resend for email notifications
- Yet Another React Lightbox for portfolio gallery

### 📧 Forms & Integrations
- Contact form with Supabase storage
- Quotation request modal
- Email notifications via Resend
- File upload support (ready for implementation)
- Admin dashboard with basic authentication

## Quick Start

### Prerequisites
- Node.js 18+
- Supabase account
- Resend account (optional)

### Installation

1. **Clone and install dependencies:**
```bash
cd exhibitfabricmy
npm install
```

2. **Set up environment variables:**
```bash
cp .env.example .env.local
```
Fill in your Supabase and Resend credentials in `.env.local`

3. **Set up Supabase database:**
- Create a new Supabase project
- Run the SQL in `supabase/schema.sql` in your Supabase SQL Editor

4. **Add placeholder images:**
See `SETUP.md` for image requirements and paths

5. **Run development server:**
```bash
npm run dev
```

6. **Open your browser:**
Visit [http://localhost:3000](http://localhost:3000)

## Project Structure

```
exhibitfabricmy/
├── app/
│   ├── about/              # About page
│   ├── admin/              # Admin dashboard
│   ├── api/
│   │   ├── contact/        # Contact form API
│   │   └── quotation/      # Quotation form API
│   ├── contact/            # Contact page
│   ├── portfolio/          # Portfolio gallery
│   ├── product/            # Products listing
│   │   └── [slug]/         # Individual product pages
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Home page
├── components/
│   ├── ui/                 # Shadcn UI components
│   ├── cta-banner.tsx      # CTA section
│   ├── footer.tsx          # Footer component
│   ├── hero-slider.tsx     # Hero carousel
│   ├── navbar.tsx          # Navigation bar
│   ├── product-card.tsx    # Product card component
│   └── quotation-modal.tsx # Quotation form modal
├── data/
│   ├── portfolio.ts        # Portfolio data
│   ├── products.ts         # Product catalog
│   └── site-config.ts      # Site configuration
├── lib/
│   ├── supabase.ts         # Supabase client
│   └── utils.ts            # Utility functions
├── public/
│   ├── hero/               # Hero slider images
│   ├── portfolio/          # Portfolio images
│   └── products/           # Product images
├── supabase/
│   └── schema.sql          # Database schema
├── types/
│   └── index.ts            # TypeScript types
├── SETUP.md                # Detailed setup guide
└── README.md               # This file
```

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS, Shadcn/UI
- **Animation**: Framer Motion
- **Forms**: React Hook Form, Zod
- **Database**: Supabase (PostgreSQL)
- **Email**: Resend
- **Image Carousel**: Embla Carousel
- **Lightbox**: Yet Another React Lightbox
- **Icons**: Lucide React

## Configuration

### Brand Colors
Edit `tailwind.config.ts`:
```typescript
colors: {
  primary: "#0056D2",
  accent: {
    pink: "#FF3C6A",
    orange: "#F76C28",
    purple: "#5B46D8",
  },
}
```

### Site Information
Edit `data/site-config.ts`:
```typescript
export const siteConfig = {
  name: "Exhibit Fabric",
  contact: {
    email: "info@exhibitfabric.com",
    phone: "+60 12-345 6789",
    address: "Kota Kinabalu, Sabah, Malaysia",
  },
  // ...
};
```

### Products
Edit `data/products.ts` to add/modify products.

### Portfolio Items
Edit `data/portfolio.ts` to update portfolio items.

## Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import repository in Vercel
3. Add environment variables
4. Deploy

See `SETUP.md` for detailed deployment instructions.

## Admin Access

Visit `/admin` and login with credentials from `.env.local`:
- Default username: `admin`
- Default password: `admin` (change this!)

## Environment Variables

Required variables:
```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
RESEND_API_KEY=
RESEND_FROM_EMAIL=
ADMIN_USERNAME=
ADMIN_PASSWORD=
NEXT_PUBLIC_SITE_URL=
```

See `.env.example` for full list.

## Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

## Features to Add

- [ ] File upload functionality
- [ ] Advanced admin features (status updates, replies)
- [ ] Google Analytics integration
- [ ] SEO optimizations
- [ ] Multi-language support
- [ ] Blog section
- [ ] Customer testimonials
- [ ] Live chat integration

## Support

For detailed setup instructions, see [SETUP.md](./SETUP.md)

## License

This project is proprietary and confidential.

## Credits

Built with ❤️ for Exhibit Fabric
