// Verification script for clean product catalog pricing

function formatPrice(price) {
  const numericPrice = price.replace(/[^\d.]/g, '');
  if (!numericPrice) return price;
  const formattedNumber = parseFloat(numericPrice).toFixed(2);
  const parts = formattedNumber.split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return `RM ${parts.join('.')}`;
}

function parsePriceOptions(priceString) {
  const options = [];

  // Check for "Single / Double sided" pattern
  const singleDoubleMatch = priceString.match(/RM\s*([\d,]+(?:\.\d{2})?)\s*\(Single\)\s*\/\s*RM\s*([\d,]+(?:\.\d{2})?)\s*\(Double sided\)/i);
  if (singleDoubleMatch) {
    const singlePrice = singleDoubleMatch[1].replace(/,/g, '');
    const doublePrice = singleDoubleMatch[2].replace(/,/g, '');
    return [
      {
        label: 'Single Sided',
        value: formatPrice(`RM ${singlePrice}`),
        numericValue: parseFloat(singlePrice)
      },
      {
        label: 'Double Sided',
        value: formatPrice(`RM ${doublePrice}`),
        numericValue: parseFloat(doublePrice)
      }
    ];
  }

  // Check for "Frame only / inc. print" pattern
  const frameMatch = priceString.match(/RM\s*([\d,]+(?:\.\d{2})?)\s*\(Frame only\)\s*\/\s*RM\s*([\d,]+(?:\.\d{2})?)\s*\(inc\.\s*print\)/i);
  if (frameMatch) {
    const framePrice = frameMatch[1].replace(/,/g, '');
    const printPrice = frameMatch[2].replace(/,/g, '');
    return [
      {
        label: 'Frame Only',
        value: formatPrice(`RM ${framePrice}`),
        numericValue: parseFloat(framePrice)
      },
      {
        label: 'With Print',
        value: formatPrice(`RM ${printPrice}`),
        numericValue: parseFloat(printPrice)
      }
    ];
  }

  // Single price
  const singleMatch = priceString.match(/RM\s*([\d,]+(?:\.\d{2})?)/);
  if (singleMatch) {
    const price = singleMatch[1].replace(/,/g, '');
    return [
      {
        label: 'Standard',
        value: formatPrice(`RM ${price}`),
        numericValue: parseFloat(price)
      }
    ];
  }

  return options;
}

console.log('\n✓ Product Catalog Price Display - Verification\n');
console.log('='.repeat(70));

const sampleProducts = [
  {
    name: 'Pop Up Straight 2x3',
    originalPrice: 'RM 1,500'
  },
  {
    name: 'Tension Stand 90x200',
    originalPrice: 'RM 300 (Single) / RM 400 (Double sided)'
  },
  {
    name: 'Hard Casing Display',
    originalPrice: 'RM 400 (Frame only) / RM 500 (inc. print)'
  },
  {
    name: 'Tripod Stand',
    originalPrice: 'RM 37.50'
  }
];

console.log('\n📦 Product Catalog Display:\n');

sampleProducts.forEach((product, index) => {
  const options = parsePriceOptions(product.originalPrice);
  const displayPrice = options[0]?.value || product.originalPrice;
  const hasMultipleOptions = options.length > 1;
  const prefix = hasMultipleOptions ? 'From ' : '';

  console.log(`${index + 1}. ${product.name}`);
  console.log(`   Original: ${product.originalPrice}`);
  console.log(`   Catalog Display: ${prefix}${displayPrice}`);
  console.log(`   Options Available: ${options.length}`);
  console.log('');
});

console.log('='.repeat(70));
console.log('\n✓ Visual Examples:\n');

console.log('Standard Product:');
console.log('┌─────────────────────────────────┐');
console.log('│ Pop Up Straight 2x3             │');
console.log('│ Description...                  │');
console.log('│ RM 1,500.00             [View]  │  ← Clean, no "From"');
console.log('└─────────────────────────────────┘\n');

console.log('Product with Options:');
console.log('┌─────────────────────────────────┐');
console.log('│ Tension Stand 90x200            │');
console.log('│ Description...                  │');
console.log('│ From RM 300.00          [View]  │  ← Shows "From"');
console.log('└─────────────────────────────────┘\n');

console.log('='.repeat(70));
console.log('\n✓ Benefits:\n');
console.log('  • Cleaner, less confusing display');
console.log('  • Shows lowest price for easy comparison');
console.log('  • "From" indicates more options available');
console.log('  • Full options shown on product detail page');
console.log('  • Better mobile experience\n');
