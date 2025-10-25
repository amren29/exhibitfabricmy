# Shopping Cart Testing Guide

## Quick Start

1. **Start the development server:**
   ```bash
   npm run dev
   ```

2. **Open your browser:**
   ```
   http://localhost:3000
   ```

## Testing Steps

### Step 1: Add Products to Cart

1. Navigate to **Products** page: `http://localhost:3000/product`
2. Click on any product (e.g., "Pop Up Straight 2x3")
3. On the product detail page, you'll see:
   - Product name and details
   - Price (updated to RM 1,500)
   - **"Add to Cart"** button (blue button with cart icon)
4. Click **"Add to Cart"**
5. You should see:
   - ✅ Green toast notification: "Product added to cart!"
   - ✅ Cart icon in navigation shows badge with "1"

### Step 2: Add More Products

1. Go back to products page
2. Click another product (e.g., "Pop Up Curve 3x3")
3. Click **"Add to Cart"** again
4. Cart badge should now show "2"

### Step 3: View Shopping Cart

1. Click the **cart icon** in the navigation (top right)
2. You'll be redirected to: `http://localhost:3000/cart`
3. You should see:
   - All products you added
   - Each product showing:
     - Name, category, price
     - Size and specifications
     - Quantity controls (-, quantity, +)
     - Remove button (trash icon)
   - Right sidebar with:
     - Total items count
     - "Request Quotation" button
     - "Add More Products" button

### Step 4: Manage Quantities

1. Click the **"+" button** to increase quantity
   - Quantity number increases
   - Cart badge in navigation updates
2. Click the **"-" button** to decrease quantity
   - Quantity number decreases
   - Cart badge updates
3. Try decreasing to 0:
   - Item should be removed from cart
4. Click the **trash icon** to remove an item
   - ✅ Red toast: "Product removed"
   - Item disappears from cart

### Step 5: Request Quotation

1. Make sure you have at least one item in cart
2. Click **"Request Quotation"** button
3. A modal should appear with form fields:
   - Company Name *
   - Contact Person *
   - Email Address *
   - Phone Number *
   - Company Address *
4. Try submitting without filling (validation test):
   - ❌ Red toast: "Please fill in all fields"
5. Try entering invalid email:
   - ❌ Red toast: "Please enter a valid email address"

### Step 6: Complete Quotation Request

1. Fill in all required fields:
   ```
   Company Name: ABC Trading Sdn Bhd
   Contact Person: Ahmad Abdullah
   Email: ahmad@abctrading.com
   Phone: +60 12-345 6789
   Address: 123 Jalan Example, Kuala Lumpur
   ```
2. Click **"Send Quotation Request"**
3. System should:
   - ✅ Show success toast: "Redirecting to WhatsApp!"
   - ✅ Open WhatsApp Web/App in new tab
   - ✅ Message pre-filled with:
     - Company details
     - All cart products with quantities
     - Product specifications
   - ✅ Recipient: 0103570729

### Step 7: WhatsApp Message Verification

Check that the WhatsApp message contains:
```
*QUOTATION REQUEST*

*Company Details:*
Company: ABC Trading Sdn Bhd
Contact Person: Ahmad Abdullah
Email: ahmad@abctrading.com
Phone: +60 12-345 6789
Address: 123 Jalan Example, Kuala Lumpur

*Products Requested:*
========================================

*1. Pop Up Straight 2x3*
   Category: Display System
   Price: RM 1,500
   Quantity: 1
   Size: 284 cm (W) × 232 cm (H)
   Specification: Material: Tension Fabric...

*2. Pop Up Curve 3x3*
   ...

========================================
*Total Items: [X]*

Please provide a detailed quotation for the above products.
Thank you!
```

### Step 8: Test LocalStorage Persistence

1. Add some products to cart
2. **Refresh the page** (F5)
3. Check cart icon - badge should still show items
4. Open cart page - products should still be there
5. **Open browser DevTools** (F12)
6. Go to **Application** > **Local Storage** > `http://localhost:3000`
7. Find key: `exhibitCart`
8. You should see JSON with your cart items

### Step 9: Test Empty Cart State

1. Remove all items from cart (click trash on each)
2. Cart should show:
   - Shopping bag icon (empty state)
   - "Your Cart is Empty" message
   - "Browse Products" button
3. Click "Browse Products" - redirects to `/product`

### Step 10: Test Navigation & Responsive

1. **Desktop view:**
   - Cart icon visible between nav links and "Get a Quote"
   - Cart page shows 2-column layout (items + sidebar)

2. **Mobile view** (resize browser or use DevTools):
   - Cart icon appears next to mobile menu
   - Cart page shows stacked layout
   - Quantity controls are touch-friendly

## Edge Cases to Test

### Empty Cart
- ✅ Try clicking "Request Quotation" with empty cart
  - Should show error: "Cart is empty"

### Single Item
- ✅ Add one item, decrease to 0
  - Should remove item completely

### Large Quantities
- ✅ Click "+" button 20 times
  - Should work smoothly
  - Badge updates correctly

### Navigation
- ✅ Add items, then navigate to other pages
  - Cart badge should persist on all pages

### Form Validation
- ✅ Try various invalid emails:
  - `test@` - Invalid
  - `test.com` - Invalid
  - `test@example` - Invalid
  - `test@example.com` - Valid ✅

## Success Criteria

All these should work:
- ✅ Products can be added to cart
- ✅ Cart badge shows correct count
- ✅ Cart page displays all items
- ✅ Quantities can be increased/decreased
- ✅ Items can be removed
- ✅ Empty cart shows friendly message
- ✅ Form validation works
- ✅ WhatsApp integration works
- ✅ Message is properly formatted
- ✅ LocalStorage persists cart
- ✅ Responsive on all devices
- ✅ No console errors
- ✅ Toast notifications appear

## Common Issues & Solutions

### Cart icon not showing badge
- **Check:** Browser console for errors
- **Fix:** Make sure CartProvider is wrapping the app in layout.tsx

### WhatsApp not opening
- **Check:** Pop-up blocker in browser
- **Fix:** Allow pop-ups for localhost

### Cart data lost on refresh
- **Check:** Browser localStorage is enabled
- **Fix:** Check privacy settings, try different browser

### TypeScript errors
- **Run:** `npx tsc --noEmit`
- **Fix:** Check for any type mismatches

## Mobile Testing (Recommended)

1. Open on mobile device or use DevTools device emulation
2. Test all above steps on:
   - iPhone (Safari, Chrome)
   - Android (Chrome, Samsung Browser)
3. Verify WhatsApp opens in:
   - WhatsApp app (if installed)
   - WhatsApp Web (if not installed)

## Production Checklist

Before deploying:
- [ ] Test on real mobile devices
- [ ] Verify WhatsApp number is correct (0103570729)
- [ ] Test with real company details
- [ ] Check all toast messages
- [ ] Verify responsive design
- [ ] Test on different browsers
- [ ] Check console for errors
- [ ] Test cart persistence
- [ ] Verify form validation
- [ ] Test with many items (20+)

## Support

If you encounter any issues:
1. Check browser console for errors
2. Verify all dependencies are installed: `npm install`
3. Clear browser cache and localStorage
4. Restart development server
5. Check this testing guide for common issues

---

**Happy Testing! 🛒**
