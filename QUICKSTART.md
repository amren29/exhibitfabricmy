# Exhibit Fabric - Quick Start Guide

Get the website running in 5 minutes!

## Prerequisites

- Node.js 18+ installed
- A Supabase account (sign up at [supabase.com](https://supabase.com))

## Step 1: Install Dependencies (1 min)

```bash
npm install
```

## Step 2: Set Up Supabase (2 min)

1. **Create a new Supabase project** at https://supabase.com
2. **Go to SQL Editor** in your project dashboard
3. **Copy and paste** the entire contents of `supabase/schema.sql`
4. **Click "Run"** to create the database tables

## Step 3: Environment Variables (1 min)

1. Copy the example environment file:
```bash
cp .env.example .env.local
```

2. Get your Supabase credentials:
   - Go to **Settings > API** in your Supabase project
   - Copy the **Project URL** and **anon key**

3. Edit `.env.local` and add your credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

**Note**: You can skip Resend/admin setup for now - the site will work without them!

## Step 4: Run the Development Server (30 sec)

```bash
npm run dev
```

Visit **http://localhost:3000** 🎉

## Step 5: Add Images (Optional)

The site will work without images, but you'll see broken image icons. To add images:

1. Download some stock photos from [Unsplash](https://unsplash.com)
2. Place them in the required folders (see `IMAGE_GUIDE.md` for details)

**Quick image folders:**
```bash
public/
├── hero/        # 5 images for hero slider
├── products/    # 21 product images
└── portfolio/   # 8 portfolio images
```

## Testing the Site

| Page | URL | What to Test |
|------|-----|-------------|
| Home | `/` | Hero slider, products, portfolio preview |
| Products | `/product` | Product grid |
| Product Detail | `/product/fabric-lightbox-display` | Image carousel, quotation modal |
| Portfolio | `/portfolio` | Gallery with lightbox |
| Contact | `/contact` | Contact form submission |
| About | `/about` | Company information |
| Admin | `/admin` | Login (use credentials from .env.local) |

## Common Issues

### "Module not found" errors
```bash
# Clear Next.js cache and reinstall
rm -rf .next node_modules
npm install
```

### Images not loading
- Make sure image files exist in `public/` folder
- Check that filenames match exactly (case-sensitive)
- Clear browser cache

### Forms not submitting
- Verify Supabase credentials in `.env.local`
- Check browser console for errors
- Make sure you ran the SQL schema in Supabase

## Next Steps

### For Production:

1. **Set up Resend** for email notifications (see `SETUP.md`)
2. **Add real images** for all products and portfolio items
3. **Customize content** in `data/` folder
4. **Change admin password** in `.env.local`
5. **Deploy to Vercel** (see `SETUP.md`)

### Customization:

- **Brand colors**: Edit `tailwind.config.ts`
- **Company info**: Edit `data/site-config.ts`
- **Products**: Edit `data/products.ts`
- **Portfolio**: Edit `data/portfolio.ts`

## File Structure Overview

```
📦 exhibitfabricmy
├── 📂 app/                 # Pages and routes
│   ├── page.tsx           # Home page
│   ├── about/             # About page
│   ├── product/           # Products pages
│   ├── portfolio/         # Portfolio page
│   ├── contact/           # Contact page
│   ├── admin/             # Admin dashboard
│   └── api/               # API routes
├── 📂 components/          # React components
├── 📂 data/                # Mock data & config
├── 📂 lib/                 # Utilities
├── 📂 public/              # Static assets
├── 📂 supabase/            # Database schema
└── 📂 types/               # TypeScript types
```

## Key Features Built In

✅ Hero slider with auto-play
✅ 10 product categories with detail pages
✅ Portfolio gallery with lightbox
✅ Contact form with validation
✅ Quotation request modal
✅ Admin dashboard
✅ Email notifications (when configured)
✅ Mobile responsive
✅ Smooth animations
✅ SEO optimized

## Development Commands

```bash
npm run dev      # Start dev server (http://localhost:3000)
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Check code quality
```

## Need Help?

- **Detailed Setup**: See `SETUP.md`
- **Image Guide**: See `IMAGE_GUIDE.md`
- **Main README**: See `README.md`

## Production Checklist

Before deploying to production:

- [ ] Add all images
- [ ] Update company information in `data/site-config.ts`
- [ ] Customize products and portfolio
- [ ] Set up Resend for emails
- [ ] Change admin password
- [ ] Test all forms
- [ ] Add your custom domain
- [ ] Set up analytics (optional)

---

**That's it!** You now have a fully functional corporate website. For detailed customization and deployment instructions, refer to `SETUP.md`.

Happy building! 🚀
