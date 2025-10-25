# Product Catalog System - Integration Guide

## Overview

This product catalog system includes:
- 115+ products across 11 categories (33 sample products included)
- Category-based filtering
- Product detail modal with specifications
- Quotation request form with file upload
- Supabase database integration
- Email notifications via Resend

---

## File Structure

```
exhibitfabricmy/
├── data/
│   └── products.json              # Product catalog (33 sample products, 3 per category)
├── types/
│   └── product.ts                 # TypeScript interfaces
├── app/
│   ├── product/
│   │   └── page.tsx              # Main product page with category filtering
│   └── api/
│       └── quotation/
│           └── route.ts          # API endpoint for quotation submissions
├── components/
│   ├── ProductDetailModal.tsx    # Product detail modal component
│   └── QuotationForm.tsx         # Quotation form component
├── lib/
│   └── supabase.ts               # Supabase client configuration
└── supabase/
    └── schema.sql                # Database schema
```

---

## Product Data Structure

Each product in `data/products.json` follows this structure:

```json
{
  "id": "EM-17Z",
  "name": "Fabric Backdrop EM-17Z",
  "category": "Fabric Backdrops & Booths",
  "description": "Portable tension fabric backdrop...",
  "specification": "Material: Tension Fabric, Frame: Aluminum...",
  "size": "3000mm x 2300mm",
  "price": "Request quotation",
  "image": "/products/em-17z.jpg",
  "features": ["Double-sided printing", "Tool-free assembly", ...]
}
```

---

## Categories (11 Total)

1. Fabric Backdrops & Booths
2. Counters
3. Display Racks
4. Singular Displays
5. Hanging Banners
6. 3D & Arch Series
7. Columns / Towers
8. Outdoor & Pavement Series
9. Lightbox & SEG Systems
10. Poster Frames / Literature Stands
11. Table Throws

---

## Setup Instructions

### 1. Install Dependencies

```bash
npm install @supabase/supabase-js
# or
yarn add @supabase/supabase-js
```

### 2. Configure Environment Variables

Create or update `.env.local`:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Email Configuration (Optional - for notifications)
RESEND_API_KEY=your_resend_api_key
RESEND_FROM_EMAIL=your_verified_email@domain.com
```

### 3. Set Up Supabase Database

1. Go to your Supabase project dashboard
2. Navigate to SQL Editor
3. Run the SQL script from `supabase/schema.sql`
4. This will create:
   - `quotations` table
   - `quotation-files` storage bucket
   - Necessary indexes and policies
   - Row-Level Security policies

### 4. Create Storage Bucket (if not auto-created)

In Supabase Dashboard:
1. Go to Storage
2. Create a new bucket named `quotation-files`
3. Set it to **Public**
4. This allows file uploads from the quotation form

---

## Adding More Products

To add the remaining ~82 products:

1. Open `data/products.json`
2. Add products to the `products` array following the same structure
3. Ensure each product has a unique `id`
4. Assign the correct `category` from the categories list
5. Add product features as an array

**Example:**

```json
{
  "id": "NEW-001",
  "name": "New Product Name",
  "category": "Fabric Backdrops & Booths",
  "description": "Product description here...",
  "specification": "Material: ..., Frame: ..., Printing: ...",
  "size": "1200mm x 2000mm",
  "price": "Request quotation",
  "image": "/products/new-001.jpg",
  "features": [
    "Feature 1",
    "Feature 2",
    "Feature 3"
  ]
}
```

---

## Adding Product Images

### Option 1: Local Images (Development)

1. Create a `public/products/` directory
2. Add product images with filenames matching the product ID
   - Example: `public/products/em-17z.jpg`
3. Update the `image` field in products.json:
   ```json
   "image": "/products/em-17z.jpg"
   ```

### Option 2: Supabase Storage (Production)

1. Upload images to Supabase Storage bucket `product-images`
2. Get the public URL for each image
3. Update the `image` field with the full URL:
   ```json
   "image": "https://your-project.supabase.co/storage/v1/object/public/product-images/em-17z.jpg"
   ```

### Option 3: External CDN

Use any image hosting service and provide the full URL:
```json
"image": "https://cdn.example.com/products/em-17z.jpg"
```

---

## Features

### Product Page (`/product`)

- **Category Filtering**:
  - Desktop: Tab-based navigation
  - Mobile: Dropdown selector
- **Product Grid**: Responsive 3-column layout (1-2 columns on mobile)
- **Hover Effects**: Scale and shadow animations
- **Product Count**: Shows filtered product count

### Product Detail Modal

Opens when clicking any product card, displaying:
- Product image
- Full description
- Specifications
- Key features with checkmarks
- Size and pricing information
- "Request Quotation" button

### Quotation Form

- **Auto-filled product name** from the selected product
- Required fields: Name, Email, Phone, Product Name
- Optional fields: Message, File Upload
- **File Upload Support**: PDF, DOC, DOCX, JPG, PNG (max 5MB)
- **Real-time validation**
- **Success/Error notifications**
- Automatic form reset after successful submission

### API Endpoint (`/api/quotation`)

**POST** - Submit new quotation:
```typescript
FormData {
  name: string
  email: string
  phone: string
  product_name: string
  message?: string
  file?: File
}
```

**GET** - Retrieve quotations (admin):
```
/api/quotation
/api/quotation?status=pending
```

---

## Styling Guidelines

The design follows your brand guidelines:

- **Primary Brand Color**: `#0056D2`
- **Gradient Accent**: `linear-gradient(90deg, #FF3C6A, #F76C28, #5B46D8)`
- **Background**: Gradient from gray-50 to blue-50
- **Font**: System fonts (can be customized to Inter/Poppins)
- **Buttons**: Rounded (rounded-xl), gradient background, hover effects
- **Cards**: Soft shadows with scale effect on hover

---

## Database Schema

### Quotations Table

| Column        | Type      | Description                       |
|---------------|-----------|-----------------------------------|
| id            | UUID      | Primary key                       |
| name          | VARCHAR   | Customer name                     |
| email         | VARCHAR   | Customer email                    |
| phone         | VARCHAR   | Customer phone                    |
| product_name  | VARCHAR   | Product being quoted              |
| message       | TEXT      | Customer message/requirements     |
| file_url      | TEXT      | URL to uploaded file (optional)   |
| status        | VARCHAR   | pending/processing/completed      |
| created_at    | TIMESTAMP | Creation timestamp                |
| updated_at    | TIMESTAMP | Last update timestamp             |

---

## Testing

### 1. Test Product Display

```bash
npm run dev
```

Visit `http://localhost:3000/product` and verify:
- All 33 sample products are displayed
- Category filtering works
- Product cards are responsive

### 2. Test Product Modal

- Click any product card
- Verify modal opens with all product details
- Check that "Request Quotation" button works

### 3. Test Quotation Form

- Fill out the form
- Upload a test file (optional)
- Submit and verify success message
- Check Supabase database for the new entry

### 4. Test API Endpoint

```bash
# Test GET endpoint
curl http://localhost:3000/api/quotation

# Test POST endpoint
curl -X POST http://localhost:3000/api/quotation \
  -F "name=John Doe" \
  -F "email=john@example.com" \
  -F "phone=+1234567890" \
  -F "product_name=Test Product" \
  -F "message=Test message"
```

---

## Email Notifications (Optional)

The system includes Resend integration for email notifications:

1. Sign up at [resend.com](https://resend.com)
2. Add your API key to `.env.local`
3. Verify your sending domain
4. Update `RESEND_FROM_EMAIL` with your verified email

When configured, you'll receive an email for each quotation request.

---

## Production Deployment

### 1. Build the Application

```bash
npm run build
```

### 2. Deploy to Vercel (Recommended)

```bash
vercel
```

### 3. Set Environment Variables

In your Vercel dashboard or hosting platform:
- Add all environment variables from `.env.local`
- Ensure Supabase URLs and keys are set

### 4. Verify Deployment

- Visit your production URL
- Test the product page
- Submit a test quotation
- Verify data appears in Supabase

---

## Customization

### Change Brand Colors

Update Tailwind classes in:
- `app/product/page.tsx`
- `components/ProductDetailModal.tsx`
- `components/QuotationForm.tsx`

Example:
```tsx
// From
className="bg-[#0056D2]"

// To
className="bg-[#YOUR_COLOR]"
```

### Modify Categories

Edit `data/products.json`:
```json
{
  "categories": [
    "Your Category 1",
    "Your Category 2",
    ...
  ]
}
```

### Add Custom Fields to Quotation

1. Update TypeScript type in `types/product.ts`
2. Update database schema in `supabase/schema.sql`
3. Update form in `components/QuotationForm.tsx`
4. Update API in `app/api/quotation/route.ts`

---

## Troubleshooting

### Products Not Displaying

- Check that `data/products.json` is properly formatted
- Verify JSON syntax is correct
- Check browser console for errors

### Quotation Form Not Submitting

- Verify Supabase credentials in `.env.local`
- Check that the database table exists
- Review browser console and Network tab for errors
- Verify RLS policies are set correctly

### File Upload Not Working

- Ensure `quotation-files` bucket exists in Supabase Storage
- Verify bucket is set to Public
- Check storage policies allow public uploads
- Verify file size is under 5MB

### Images Not Showing

- Verify image paths are correct
- Check that images exist in `public/products/` or external URL is accessible
- Clear browser cache

---

## Future Enhancements

Consider adding:
- [ ] Product search functionality
- [ ] Price range filter
- [ ] Product comparison feature
- [ ] Wishlist/favorites
- [ ] Admin dashboard for managing quotations
- [ ] Product reviews and ratings
- [ ] Multi-image product gallery
- [ ] PDF quotation generation
- [ ] WhatsApp integration for quotations
- [ ] Live chat support

---

## Support

For questions or issues:
1. Check this documentation
2. Review Supabase documentation: https://supabase.com/docs
3. Review Next.js documentation: https://nextjs.org/docs

---

## Sample Products Included

The `products.json` file includes **33 sample products** (3 per category):

### Fabric Backdrops & Booths (3)
- EM-17Z, EM-18A, EM-20B

### Counters (3)
- CT-101, CT-205, CT-310

### Display Racks (3)
- DR-401, DR-502, DR-608

### Singular Displays (3)
- SD-701, SD-805, SD-912

### Hanging Banners (3)
- HB-101, HB-205, HB-308

### 3D & Arch Series (3)
- 3D-401, 3D-505, 3D-612

### Columns / Towers (3)
- CL-701, CL-808, CL-915

### Outdoor & Pavement Series (3)
- OD-201, OD-305, OD-412

### Lightbox & SEG Systems (3)
- LB-501, LB-608, LB-712

### Poster Frames / Literature Stands (3)
- PF-101, PF-205, PF-308

### Table Throws (3)
- TT-901, TT-1005, TT-1108

**Total: 33 sample products ready to use!**

You can add the remaining ~82 products using the same structure.

---

## License

This product catalog system is part of the Exhibit Fabric website project.

---

**Built with:**
- Next.js 15
- TypeScript
- Tailwind CSS
- Supabase
- Resend (optional)
