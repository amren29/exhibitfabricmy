// Test script for price option parsing

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

console.log('\n✓ Price Option Parsing Test\n');
console.log('='.repeat(60));

const testCases = [
  'RM 1,500',
  'RM 300 (Single) / RM 400 (Double sided)',
  'RM 400 (Frame only) / RM 500 (inc. print)',
  'RM 11,250',
];

testCases.forEach((price, index) => {
  console.log(`\nTest ${index + 1}: ${price}`);
  const options = parsePriceOptions(price);
  console.log(`Found ${options.length} option(s):`);
  options.forEach(opt => {
    console.log(`  - ${opt.label}: ${opt.value} (numeric: ${opt.numericValue})`);
  });
});

console.log('\n' + '='.repeat(60));
console.log('\n✓ All price parsing tests completed!\n');
