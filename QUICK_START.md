# Product Catalog - Quick Start Guide

## What's Been Created

✅ **33 Sample Products** (3 per category across 11 categories)
✅ **Product Page** with category filtering
✅ **Product Detail Modal** with specifications
✅ **Quotation Form** with file upload
✅ **API Endpoint** for quotation submissions
✅ **Supabase Integration** ready to use

---

## Quick Setup (5 Minutes)

### 1. Set Up Supabase

```bash
# 1. Go to https://supabase.com and create a project
# 2. Copy your project URL and keys
# 3. Add to .env.local:

NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

### 2. Create Database Tables

1. Open Supabase SQL Editor
2. Copy and paste contents from `supabase/schema.sql`
3. Run the SQL script
4. Verify tables and storage bucket were created

### 3. Test the System

```bash
# Start development server
npm run dev

# Visit the product page
# http://localhost:3000/product

# Try:
# - Filtering by category
# - Clicking a product to open modal
# - Submitting a quotation request
```

### 4. Verify in Supabase

1. Go to Supabase Dashboard → Table Editor
2. Check the `quotations` table
3. Your test quotation should appear there

---

## File Locations

| What | Where |
|------|-------|
| Product Data | `/data/products.json` |
| Product Page | `/app/product/page.tsx` |
| Detail Modal | `/components/ProductDetailModal.tsx` |
| Quotation Form | `/components/QuotationForm.tsx` |
| API Endpoint | `/app/api/quotation/route.ts` |
| Types | `/types/product.ts` |
| Database Schema | `/supabase/schema.sql` |

---

## Adding More Products

Edit `/data/products.json` and add to the `products` array:

```json
{
  "id": "YOUR-ID",
  "name": "Product Name",
  "category": "One of the 11 categories",
  "description": "Product description",
  "specification": "Material: ..., Frame: ...",
  "size": "Dimensions",
  "price": "Request quotation",
  "image": "/products/your-id.jpg",
  "features": ["Feature 1", "Feature 2"]
}
```

Currently: **33 products included**
Target: **~115 products total**
Remaining: **~82 products to add**

---

## Product Images

### Quick Solution (Placeholder)
Currently using SVG placeholders that show product ID.

### Add Real Images

**Option 1 - Local (Quick)**
```bash
# 1. Create folder
mkdir -p public/products

# 2. Add images named by product ID
# Example: public/products/em-17z.jpg

# 3. Images automatically work (already configured)
```

**Option 2 - Supabase Storage**
1. Upload to Supabase Storage bucket `product-images`
2. Get public URL
3. Update `image` field in products.json

**Option 3 - External CDN**
Use any image hosting and update URLs in products.json

---

## Customization

### Change Brand Colors

Search and replace in components:
- `#0056D2` → Your primary color
- `from-[#FF3C6A] via-[#F76C28] to-[#5B46D8]` → Your gradient

### Modify Categories

Update `/data/products.json`:
```json
{
  "categories": ["Category 1", "Category 2", ...]
}
```

### Add Custom Form Fields

1. Update type in `/types/product.ts`
2. Update form in `/components/QuotationForm.tsx`
3. Update API in `/app/api/quotation/route.ts`
4. Update schema in `/supabase/schema.sql`

---

## Common Issues

### "Products not showing"
- Check `/data/products.json` for JSON syntax errors
- Verify file is in the correct location

### "Form not submitting"
- Check `.env.local` has correct Supabase credentials
- Verify database table exists
- Check browser console for errors

### "File upload fails"
- Verify `quotation-files` bucket exists in Supabase Storage
- Ensure bucket is set to "Public"
- Check file is under 5MB

---

## Next Steps

1. **Add Remaining Products** (~82 more)
   - Follow the structure in products.json
   - 3 examples per category already provided

2. **Add Product Images**
   - Upload to `public/products/` or Supabase Storage
   - Name files matching product IDs

3. **Customize Styling**
   - Update colors to match exact brand guidelines
   - Modify fonts (currently using system fonts)

4. **Set Up Email Notifications** (Optional)
   - Sign up at resend.com
   - Add credentials to .env.local
   - Already integrated, just needs configuration

5. **Deploy to Production**
   ```bash
   npm run build
   vercel
   ```

---

## Product Categories (11 Total)

Each with 3 sample products included:

1. ✅ Fabric Backdrops & Booths (EM-17Z, EM-18A, EM-20B)
2. ✅ Counters (CT-101, CT-205, CT-310)
3. ✅ Display Racks (DR-401, DR-502, DR-608)
4. ✅ Singular Displays (SD-701, SD-805, SD-912)
5. ✅ Hanging Banners (HB-101, HB-205, HB-308)
6. ✅ 3D & Arch Series (3D-401, 3D-505, 3D-612)
7. ✅ Columns / Towers (CL-701, CL-808, CL-915)
8. ✅ Outdoor & Pavement Series (OD-201, OD-305, OD-412)
9. ✅ Lightbox & SEG Systems (LB-501, LB-608, LB-712)
10. ✅ Poster Frames / Literature Stands (PF-101, PF-205, PF-308)
11. ✅ Table Throws (TT-901, TT-1005, TT-1108)

---

## Support Resources

- **Full Documentation**: See `PRODUCT_CATALOG_README.md`
- **Supabase Docs**: https://supabase.com/docs
- **Next.js Docs**: https://nextjs.org/docs
- **Tailwind CSS**: https://tailwindcss.com/docs

---

## What Works Right Now

✅ Browse all products
✅ Filter by category
✅ View product details
✅ Request quotations
✅ File upload support
✅ Data saved to Supabase
✅ Email notifications (if configured)
✅ Mobile responsive
✅ Smooth animations

**Ready to use immediately after Supabase setup!**
