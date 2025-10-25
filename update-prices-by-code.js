const fs = require('fs');
const path = require('path');

// Read products data
const productsPath = path.join(__dirname, 'data', 'products.json');
const productsData = JSON.parse(fs.readFileSync(productsPath, 'utf8'));

// Price catalog based on product codes
const priceCatalog = {
  // DISPLAY SYSTEM
  'POP UP-2X3': { price: 1500 },
  'POP UP-3X3': { price: 1750 },
  'POP UP-3X4': { price: 2250 },
  'POP UP-3X3C': { price: 1750 },
  'POP UP-3X4C': { price: 2250 },
  'PPT': { price: 625 },
  'CASING': { price: 1000 },
  'POP UP-VELCRO': { price: 1750 },

  // TENSION SYSTEM - STRAIGHT
  'POP UP-S.E (3X6.5)': { single: 750, double: 1000 },
  'POP UP-SE-3X6.5': { single: 750, double: 1000 },
  'POP UP-S.E (1X2)': { single: 1250, double: 1500 },
  'POP UP-SE-1X2': { single: 1250, double: 1500 },
  'POP UP-S.E (6X6)': { single: 1750, double: 2250 },
  'POP UP-SE-6X6': { single: 1750, double: 2250 },
  'POP UP-S.E (2.25X1.2)': { single: 1500, double: 1750 },
  'POP UP-SE-2.25X1.2': { single: 1500, double: 1750 },
  'POP UP-S.E (6X8)': { single: 2000, double: 2500 },
  'POP UP-SE-6X8': { single: 2000, double: 2500 },
  'POP UP-S.E (8X8)': { single: 2000, double: 2500 },
  'POP UP-SE-8X8': { single: 2000, double: 2500 },
  'POP UP-SE (10X8)': { single: 2500, double: 3000 },
  'POP UP-SE-10X8': { single: 2500, double: 3000 },
  'POP UP-S.E (2.25X4)': { single: 3750, double: 4375 },
  'POP UP-SE-2.25X4': { single: 3750, double: 4375 },
  'POP UP-S.E (3X4)': { single: 4000, double: 4625 },
  'POP UP-SE-3X4': { single: 4000, double: 4625 },
  'POP UP-S.E (2.25X5)': { single: 4000, double: 4625 },
  'POP UP-SE-2.25X5': { single: 4000, double: 4625 },
  'POP UP-S.E (10X17)': { single: 4250, double: 5000 },
  'POP UP-SE-10X17': { single: 4250, double: 5000 },
  'POP UP-S.E (2.25X6)': { single: 4500, double: 5500 },
  'POP UP-SE-2.25X6': { single: 4500, double: 5500 },
  'POP UP-S.E (10X20)': { single: 5000, double: 6250 },
  'POP UP-SE-10X20': { single: 5000, double: 6250 },

  // TENSION SYSTEM - CURVED & SPECIAL
  'CURVE (8x8)': { single: 2500, double: 3000 },
  'CURVE-8X8': { single: 2500, double: 3000 },
  'CURVE (11.5x8)': { single: 3500, double: 3750 },
  'CURVE-11.5X8': { single: 3500, double: 3750 },
  'CURVE (11.8x8)': { single: 4000, double: 4250 },
  'CURVE-11.8X8': { single: 4000, double: 4250 },
  'POP UP-S.SHAPE': { single: 3000, double: 3500 },
  'POP UP-S1': { single: 1000, double: 1250 },
  'POP UP-S2': { single: 1125, double: 1375 },
  'TENSION-ANGLE-90': { single: 1000, double: 1125 },
  'TENSION-ANGLE-120': { single: 1250, double: 1375 },
  'TEN-BD': { price: 1625 },
  'TEN-TABLE': { price: 1250 },
  'FAST-TENSION-TABLE': { price: 1250 },
  'TEN-LI': { single: 1125, double: 1625 },
  'SR': { price: 1125 },

  // TENSION SYSTEM - BOOTH & STRUCTURE
  'TEN-D3': { price: 11250 },
  'TENSION-BOOTH-STAND': { price: 11250 },
  'TEN-WB': { price: 5000 },
  'TEN-DU': { price: 5500 },
  'TEN-GW': { price: 6500 },
  'TEN-CW': { price: 5250 },
  'TEN-AC': { price: 7500 },
  'TEN-HBB': { price: 7500 },

  // FABRIC SYSTEM
  'WBF': { price: 112.50 },
  'WBF-5M': { price: 625 },
  'FLAG-AB': { price: 500 },
  'F.A-STAND': { price: 625 },
  'OFAB': { price: 625 },

  // PROMOTIONAL SYSTEM
  'APT': { price: 600 },
  'APT W/O WHEEL': { price: 600 },
  'APT-WO-WHEEL': { price: 600 },
  'IPT': { price: 250 },
  'PT': { price: 350 },

  // DISPLAY STAND
  'CT3-STAND': { price: 37.50 },
  'X-STAND (32)': { price: 37.50 },
  'X-STAND-32': { price: 37.50 },
  'X-STAND (3C)': { price: 62.50 },
  'X-STAND-3C': { price: 62.50 },
  'X-STAND(MINI)-A4': { price: 12.50 },
  'X-STAND-MINI-A4': { price: 12.50 },
  'T-STAND (R/B)': { price: 62.50 },
  'T-STAND-RB': { price: 62.50 },
  'DS.POSTER STAND': { price: 100 },
  'DS-POSTER-STAND': { price: 100 },
  '1-2': { price: 100 },
  '1-6': { price: 300 },
  '1-2(5\')': { price: 375 },
  'QS STAND': { price: 875 },
  'FPD': { price: 1750 }, // Note: there are two FPD products with different prices
  'ZZ-STAND': { price: 500 },
  'BRO-STAND': { price: 625 },
};

// Function to format price
function formatPrice(priceData) {
  if (priceData.price !== undefined) {
    // Single price
    return `RM ${priceData.price.toFixed(2)}`;
  } else if (priceData.single !== undefined && priceData.double !== undefined) {
    // Double-sided pricing
    return `RM ${priceData.single.toFixed(2)} (Single Sided) / RM ${priceData.double.toFixed(2)} (Double Sided)`;
  }
  return null;
}

// Function to normalize product code for matching
function normalizeCode(code) {
  return code
    .toUpperCase()
    .replace(/\s+/g, ' ')
    .replace(/-/g, ' ')
    .trim();
}

// Create a normalized lookup map
const normalizedCatalog = {};
Object.keys(priceCatalog).forEach(key => {
  const normalized = normalizeCode(key);
  normalizedCatalog[normalized] = priceCatalog[key];
});

// Update products based on product code
let updatedCount = 0;
let notFoundCount = 0;
const notFoundProducts = [];

productsData.products.forEach(product => {
  // Try direct match first
  let priceData = priceCatalog[product.id];

  // If not found, try normalized matching
  if (!priceData) {
    const normalizedId = normalizeCode(product.id);
    priceData = normalizedCatalog[normalizedId];
  }

  if (priceData) {
    const newPrice = formatPrice(priceData);
    if (newPrice) {
      console.log(`Updating ${product.name} (${product.id}): ${product.price} → ${newPrice}`);
      product.price = newPrice;
      updatedCount++;
    }
  } else {
    notFoundProducts.push({
      id: product.id,
      name: product.name,
      currentPrice: product.price
    });
    notFoundCount++;
  }
});

// Save updated products
fs.writeFileSync(productsPath, JSON.stringify(productsData, null, 2));

console.log('\n=== Price Update Summary ===');
console.log(`Total products: ${productsData.products.length}`);
console.log(`Updated: ${updatedCount}`);
console.log(`Not found in catalog: ${notFoundCount}`);

if (notFoundProducts.length > 0) {
  console.log('\nProducts not found in price catalog:');
  notFoundProducts.forEach(p => {
    console.log(`  - ${p.id}: ${p.name} (Current: ${p.currentPrice})`);
  });
}

console.log('\n✓ Products updated successfully!');
