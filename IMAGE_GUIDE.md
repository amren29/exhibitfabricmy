# Image Asset Guide

This guide details all the images needed for the Exhibit Fabric website and where to place them.

## Directory Structure

Create the following directories in your `public` folder:

```
public/
├── hero/
├── products/
└── portfolio/
```

## Required Images

### 1. Hero Slider Images (5 images)

**Location**: `public/hero/`
**Size**: 1920x1080px (16:9 aspect ratio)
**Format**: JPG or WebP

| Filename | Description | Example Keywords for Stock Photos |
|----------|-------------|----------------------------------|
| `slide-1.jpg` | Trade show booth display | "trade show booth", "exhibition display" |
| `slide-2.jpg` | Fabric printing | "fabric printing", "textile printing" |
| `slide-3.jpg` | Professional event display | "corporate event", "professional booth" |
| `slide-4.jpg` | LED lightbox solution | "LED display", "lightbox exhibition" |
| `slide-5.jpg` | Portable exhibition booth | "portable booth", "modular display" |

### 2. Product Images

**Location**: `public/products/`
**Size**: 800x600px (4:3 aspect ratio)
**Format**: JPG or WebP

#### Product 1: Fabric Lightbox Display
- `fabric-lightbox-1.jpg`
- `fabric-lightbox-2.jpg`
- `fabric-lightbox-3.jpg`

#### Product 2: Portable Exhibition Booth
- `portable-booth-1.jpg`
- `portable-booth-2.jpg`

#### Product 3: Pop-Up Banner Stand
- `banner-stand-1.jpg`
- `banner-stand-2.jpg`

#### Product 4: Custom Fabric Backdrop
- `backdrop-1.jpg`
- `backdrop-2.jpg`

#### Product 5: Modular Exhibition System
- `modular-1.jpg`
- `modular-2.jpg`

#### Product 6: Fabric Counter Display
- `counter-1.jpg`
- `counter-2.jpg`

#### Product 7: Hanging Banner Display
- `hanging-1.jpg`
- `hanging-2.jpg`

#### Product 8: Outdoor Event Tent
- `tent-1.jpg`
- `tent-2.jpg`

#### Product 9: Table Throw Cover
- `table-throw-1.jpg`

#### Product 10: LED Lightbox Wall
- `led-wall-1.jpg`
- `led-wall-2.jpg`

**Total Product Images**: 21 images

### 3. Portfolio Images (8 images)

**Location**: `public/portfolio/`
**Size**: 1200x900px (4:3 aspect ratio)
**Format**: JPG or WebP

| Filename | Description |
|----------|-------------|
| `tech-summit.jpg` | Technology conference booth |
| `healthcare-expo.jpg` | Healthcare exhibition booth |
| `auto-show.jpg` | Automotive trade show display |
| `food-festival.jpg` | Food & beverage festival tent |
| `education-fair.jpg` | Education fair island booth |
| `retail-popup.jpg` | Retail pop-up store display |
| `banking-conf.jpg` | Banking conference booth |
| `beauty-showcase.jpg` | Beauty & cosmetics showcase |

## Quick Setup Options

### Option 1: Download from Stock Photo Sites

**Free Stock Photo Sites:**
- [Unsplash](https://unsplash.com/) - Free high-quality images
- [Pexels](https://pexels.com/) - Free stock photos and videos
- [Pixabay](https://pixabay.com/) - Free images and videos

**Search Terms:**
- "trade show booth"
- "exhibition display"
- "fabric printing"
- "corporate event booth"
- "banner stand"
- "event tent"

### Option 2: Use a Placeholder Image Service

For quick testing, you can temporarily use placeholder services:

```javascript
// Example placeholder URLs (replace actual paths in data files)
https://placehold.co/1920x1080/0056D2/FFFFFF?text=Hero+Slide+1
https://placehold.co/800x600/0056D2/FFFFFF?text=Product+Image
https://placehold.co/1200x900/0056D2/FFFFFF?text=Portfolio+Item
```

### Option 3: AI-Generated Images

Use AI tools like:
- Midjourney
- DALL-E
- Stable Diffusion

**Prompt Examples:**
- "Professional trade show booth with fabric displays, modern and clean, corporate photography style"
- "LED lightbox wall at exhibition, vibrant colors, professional event photography"
- "Portable banner stand at trade show, minimalist design, professional photography"

## Image Optimization Tips

### Before Adding Images:

1. **Resize images** to the recommended dimensions
2. **Compress images** using tools like:
   - [TinyPNG](https://tinypng.com/)
   - [Squoosh](https://squoosh.app/)
   - [ImageOptim](https://imageoptim.com/) (Mac)
3. **Convert to WebP** for better performance (optional)

### Recommended Tools:

- **Batch Resize**: [Bulk Resize Photos](https://bulkresizephotos.com/)
- **Compression**: [Compressor.io](https://compressor.io/)
- **Format Conversion**: [CloudConvert](https://cloudconvert.com/)

## Automated Setup Script

Create a simple bash script to create placeholder files:

```bash
#!/bin/bash

# Create directories
mkdir -p public/hero public/products public/portfolio

# Create placeholder hero images
for i in {1..5}; do
  touch "public/hero/slide-$i.jpg"
done

# Create product placeholder images
touch public/products/{fabric-lightbox-{1..3},portable-booth-{1..2},banner-stand-{1..2},backdrop-{1..2},modular-{1..2},counter-{1..2},hanging-{1..2},tent-{1..2},table-throw-1,led-wall-{1..2}}.jpg

# Create portfolio placeholder images
touch public/portfolio/{tech-summit,healthcare-expo,auto-show,food-festival,education-fair,retail-popup,banking-conf,beauty-showcase}.jpg

echo "✓ Placeholder image structure created!"
echo "⚠ Now replace these empty files with actual images"
```

Save this as `create-image-placeholders.sh` and run:

```bash
chmod +x create-image-placeholders.sh
./create-image-placeholders.sh
```

## Next.js Image Optimization

The website uses Next.js `<Image>` component which:
- Automatically optimizes images
- Lazy loads images as needed
- Serves images in modern formats (WebP, AVIF)
- Responsive image sizing

No additional configuration needed!

## Checklist

Before going live, ensure:

- [ ] All 5 hero images are added
- [ ] All 21 product images are added
- [ ] All 8 portfolio images are added
- [ ] Images are properly compressed
- [ ] Images have appropriate resolution
- [ ] All image paths match the filenames exactly (case-sensitive)
- [ ] Test all pages to ensure images load correctly

## Troubleshooting

### Images Not Showing?

1. **Check file paths** - They're case-sensitive
2. **Verify file extensions** - Must match exactly (.jpg vs .JPG)
3. **Clear Next.js cache**: `rm -rf .next` then `npm run dev`
4. **Check browser console** for 404 errors
5. **Ensure files are in `public` folder**, not nested incorrectly

### Images Too Large?

- Website will still work but page load times will be slow
- Compress images before adding them
- Keep hero images under 500KB
- Keep product/portfolio images under 200KB

---

**Pro Tip**: Start with lower quality placeholders to get the site running, then gradually replace with high-quality professional images as you obtain them.
