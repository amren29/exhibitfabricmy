const fs = require('fs');
const path = require('path');

// Price mapping based on the provided catalog
const priceMapping = {
  // Display System
  "Pop Up Straight 2x3": "RM 1,500",
  "Pop Up Straight (2x3)": "RM 1,500",
  "POP UP STRAIGHT (2x3)": "RM 1,500",

  "Pop Up Straight 3x3": "RM 1,750",
  "Pop Up Straight (3x3)": "RM 1,750",
  "POP UP STRAIGHT (3x3)": "RM 1,750",

  "Pop Up Straight 3x4": "RM 2,250",
  "Pop Up Straight (3x4)": "RM 2,250",
  "POP UP STRAIGHT (3x4)": "RM 2,250",

  "Pop Up Curve 3x3": "RM 1,750",
  "Pop Up Curve (3x3)": "RM 1,750",
  "POP UP CURVE (3x3)": "RM 1,750",

  "Pop Up Curve 3x4": "RM 2,250",
  "Pop Up Curve (3x4)": "RM 2,250",
  "POP UP CURVE (3x4)": "RM 2,250",

  "Pop Up Promotion Table": "RM 625",
  "POP UP PROMOTION TABLE": "RM 625",

  "Hard Casing": "RM 1,000",
  "HARD CASING": "RM 1,000",

  "Velcro Pop Up": "RM 1,750",
  "VELCRO POP UP": "RM 1,750",

  // Tension System - Straight
  "Tension Stand 90cm": "RM 750",
  "Tension Stand 100cm": "RM 1,250",
  "Tension Stand 180cm": "RM 1,750",
  "Tension Stand 220cm": "RM 1,500",
  "Tension Stand 240cm": "RM 2,000",
  "Tension Stand 245cm": "RM 2,000",
  "Tension Stand 295cm": "RM 2,500",
  "Tension Stand 400cm": "RM 3,750",
  "Tension Stand 500cm": "RM 4,000",
  "Tension Stand 500cm (10x17)": "RM 4,250",
  "Tension Stand 600cm (2.25X6)": "RM 4,500",
  "Tension Stand 600cm (10X20)": "RM 5,000",

  // Tension System - Curved & Special
  "Tension Stand Curve 245cm": "RM 2,500",
  "Tension Stand Curve 345cm": "RM 3,500",
  "Tension Stand Curve 360cm": "RM 4,000",
  "Tension Stand S-Shape": "RM 3,000",
  "Tension Stand S1": "RM 1,000",
  "Tension Stand S2": "RM 1,125",
  "Tension Stand Angle (90cm)": "RM 1,000",
  "Tension Stand Angle (120cm)": "RM 1,250",
  "Tower (Curve)": "RM 1,625",
  "Fast Tension Table": "RM 1,250",
  "Tube Display Literature Stand": "RM 1,125",
  "Shelves Rack with Monitor Mount": "RM 1,125",

  // Tension System - Booth & Structure
  "Tension Booth Stand (Combo)": "RM 11,250",
  "Tube Fabric Wall Box": "RM 5,000",
  "Tube Drum Shape Display": "RM 5,500",
  "Tube Gateway Structure": "RM 6,500",
  "Tube Conference Wall": "RM 5,250",
  "Tube Formulate Arch Structure": "RM 7,500",
  "Hanging Sign Hanger Banner": "RM 7,500",

  // Fabric System
  "Flying Flag Stand (3M)": "RM 112.50",
  "Flying Flag Stand 3M": "RM 112.50",
  "Flying Flag Stand (5M)": "RM 625",
  "Flying Flag Stand 5M": "RM 625",
  "Flying Flag Stand (30in)": "RM 625",
  "Flying Flag Stand 30in": "RM 625",
  "Flying Flag Backpack": "RM 500",
  "Mesh Fabric A Stand": "RM 625",
  "Outdoor Fabric A Board": "RM 625",

  // Promotional System
  "Aluminium Promotion Table": "RM 600",
  "Iron Promotion Table": "RM 250",
  "Promotion Table Square": "RM 350",
  "Aluminium Promotion Table-A": "RM 600",

  // Display Stand
  "Tripod Stand": "RM 37.50",
  "X-Stand (Gear)": "RM 37.50",
  "X-Stand (Korea)": "RM 62.50",
  "Mini X-Stand (A4)": "RM 12.50",
  "T-Stand (Round Based)": "RM 62.50",
  "Double Side Poster Stand": "RM 100",
  "Roll Up Stand": "RM 100",
  "Deluxe Roll Up Stand (31in)": "RM 300",
  "Roll Up Stand (5ft)": "RM 375",
  "Quick Show Stand": "RM 875",
  "Folding Panel Display (PVC)": "RM 1,750",
  "Folding Panel Display (Cloth)": "RM 2,000",
  "Zig Zag Stand": "RM 500",
  "Brochure Stand": "RM 625",
};

// Helper function to find matching price
function findMatchingPrice(productName) {
  // Direct match
  if (priceMapping[productName]) {
    return priceMapping[productName];
  }

  // Try case-insensitive match
  const normalizedName = productName.toLowerCase();
  for (const [key, value] of Object.entries(priceMapping)) {
    if (key.toLowerCase() === normalizedName) {
      return value;
    }
  }

  // Try partial match for complex names
  for (const [key, value] of Object.entries(priceMapping)) {
    const keyNormalized = key.toLowerCase().replace(/[()]/g, '').trim();
    const productNormalized = normalizedName.replace(/[()]/g, '').trim();
    if (keyNormalized === productNormalized) {
      return value;
    }
  }

  return null;
}

// Read the products.json file
const filePath = path.join(__dirname, 'data', 'products.json');
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

let updatedCount = 0;
let notFoundCount = 0;
const notFoundProducts = [];

// Update prices for matching products
data.products.forEach(product => {
  const newPrice = findMatchingPrice(product.name);

  if (newPrice) {
    console.log(`✓ Updating "${product.name}": ${product.price} → ${newPrice}`);
    product.price = newPrice;
    updatedCount++;
  } else {
    console.log(`✗ No price update found for: "${product.name}"`);
    notFoundProducts.push(product.name);
    notFoundCount++;
  }
});

// Write the updated data back to the file
fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');

console.log('\n' + '='.repeat(60));
console.log(`✓ Price update complete!`);
console.log(`  - Updated: ${updatedCount} products`);
console.log(`  - Not found: ${notFoundCount} products`);
console.log('='.repeat(60));

if (notFoundProducts.length > 0) {
  console.log('\nProducts without price updates:');
  notFoundProducts.forEach(name => console.log(`  - ${name}`));
}
