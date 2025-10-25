# Exhibit Fabric - Setup Guide

This guide will help you set up and deploy the Exhibit Fabric website.

## Prerequisites

- Node.js 18+ installed
- A Supabase account (free tier works)
- A Resend account for email notifications (optional but recommended)
- Git installed

## 1. Clone and Install

```bash
cd exhibitfabricmy
npm install
```

## 2. Supabase Setup

### Create a Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Click "New Project"
3. Fill in your project details
4. Wait for the project to be created

### Run Database Migration

1. Go to your Supabase project dashboard
2. Click on "SQL Editor" in the left sidebar
3. Copy the contents of `supabase/schema.sql`
4. Paste it into the SQL Editor
5. Click "Run" to execute the SQL

This will create:
- `contacts` table for contact form submissions
- `quotations` table for quotation requests
- Necessary indexes and Row Level Security policies

### Get Your Supabase Credentials

1. In your Supabase project, go to Settings > API
2. Copy the following:
   - Project URL (this is your `NEXT_PUBLIC_SUPABASE_URL`)
   - `anon` `public` key (this is your `NEXT_PUBLIC_SUPABASE_ANON_KEY`)
   - `service_role` `secret` key (this is your `SUPABASE_SERVICE_ROLE_KEY`)

## 3. Resend Setup (Optional - for Email Notifications)

1. Go to [https://resend.com](https://resend.com)
2. Sign up for a free account
3. Verify your domain or use their testing domain
4. Go to API Keys and create a new API key
5. Copy the API key (this is your `RESEND_API_KEY`)

## 4. Environment Variables

1. Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

2. Fill in your environment variables in `.env.local`:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your-project-url.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Resend (Email)
RESEND_API_KEY=your-resend-api-key
RESEND_FROM_EMAIL=noreply@yourdomain.com

# Admin Credentials
ADMIN_USERNAME=admin
ADMIN_PASSWORD=change-this-to-a-strong-password

# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## 5. Add Placeholder Images

The website expects images in the `public` folder. You need to add:

### Hero Slider Images (5 images)
```
public/hero/slide-1.jpg
public/hero/slide-2.jpg
public/hero/slide-3.jpg
public/hero/slide-4.jpg
public/hero/slide-5.jpg
```
Recommended size: 1920x1080px

### Product Images
```
public/products/fabric-lightbox-1.jpg
public/products/fabric-lightbox-2.jpg
public/products/fabric-lightbox-3.jpg
public/products/portable-booth-1.jpg
public/products/portable-booth-2.jpg
... (and so on for all 10 products)
```
Recommended size: 800x600px

### Portfolio Images
```
public/portfolio/tech-summit.jpg
public/portfolio/healthcare-expo.jpg
public/portfolio/auto-show.jpg
public/portfolio/food-festival.jpg
public/portfolio/education-fair.jpg
public/portfolio/retail-popup.jpg
public/portfolio/banking-conf.jpg
public/portfolio/beauty-showcase.jpg
```
Recommended size: 1200x900px

**Quick Setup:** You can use placeholder images from [Unsplash](https://unsplash.com) or [Pexels](https://pexels.com) to get started quickly.

## 6. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 7. Test the Application

1. **Homepage**: Navigate to `/` to see the hero slider, products preview, and portfolio
2. **Products**: Visit `/product` to see all products
3. **Product Details**: Click any product to see details and request quotation
4. **Portfolio**: Visit `/portfolio` to see the gallery with lightbox
5. **Contact**: Visit `/contact` to test the contact form
6. **Admin**: Visit `/admin` and login with your credentials

## 8. Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Go to [https://vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Add environment variables from your `.env.local`
6. Click "Deploy"

### Environment Variables for Production

Make sure to add all these environment variables in your Vercel project settings:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `RESEND_API_KEY`
- `RESEND_FROM_EMAIL`
- `ADMIN_USERNAME`
- `ADMIN_PASSWORD`
- `NEXT_PUBLIC_SITE_URL` (your production URL)

## 9. Post-Deployment

1. Update `NEXT_PUBLIC_SITE_URL` in your environment variables to your production URL
2. Configure your custom domain in Vercel
3. Update email sender domain in Resend settings
4. Test all forms to ensure they're working correctly
5. Change the default admin password to something secure

## Customization

### Update Company Information

Edit `data/site-config.ts` to update:
- Company name
- Contact information
- Social media links

### Update Products

Edit `data/products.ts` to:
- Add/remove products
- Update product details
- Change pricing

### Update Portfolio

Edit `data/portfolio.ts` to add your actual portfolio items.

### Styling

- Brand colors: Edit `tailwind.config.ts`
- Global styles: Edit `app/globals.css`
- Font: Change in `app/layout.tsx`

## Troubleshooting

### Forms Not Submitting

- Check Supabase credentials are correct
- Verify database tables exist
- Check browser console for errors
- Ensure RLS policies are set correctly

### Images Not Loading

- Check image paths in data files
- Ensure images exist in `public` folder
- Verify image file names match exactly (case-sensitive)

### Admin Login Not Working

- Verify environment variables are set
- Check credentials match `.env.local`
- Clear browser cache and cookies

## Support

For issues or questions:
1. Check the error messages in browser console
2. Check Supabase logs for database errors
3. Review Resend logs for email issues

## Security Notes

1. **Never commit `.env.local`** - it contains sensitive keys
2. **Change default admin password** immediately
3. **Use strong passwords** for admin access
4. **Keep dependencies updated** regularly
5. **Monitor Supabase usage** to stay within free tier limits

## Additional Features to Implement

- Image upload functionality for forms
- Email templates for better formatting
- Advanced admin features (update status, reply to messages)
- Analytics integration (Google Analytics, etc.)
- SEO optimizations with metadata
- Multi-language support
- Blog/News section

---

**Ready to go!** Your Exhibit Fabric website should now be fully functional. Visit your site and start showcasing your products!
