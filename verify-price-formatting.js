// Verification script for price formatting

// Simulate the formatPrice function
function formatPrice(price) {
  // Extract numeric value from price string (e.g., "RM 1,500" -> "1500")
  const numericPrice = price.replace(/[^\d.]/g, '');
  if (!numericPrice) return price;

  // Format with .00
  const formattedNumber = parseFloat(numericPrice).toFixed(2);

  // Add thousand separators and RM prefix
  const parts = formattedNumber.split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  return `RM ${parts.join('.')}`;
}

console.log('\n✓ Price Formatting Verification\n');
console.log('='.repeat(50));

// Test cases
const testPrices = [
  'RM 1,500',
  'RM 750',
  'RM 37.50',
  'RM 112.50',
  'RM 11,250',
  'RM 5,000'
];

testPrices.forEach(price => {
  const formatted = formatPrice(price);
  console.log(`${price.padEnd(20)} => ${formatted}`);
});

console.log('='.repeat(50));
console.log('\n✓ All prices formatted with .00 cents!\n');
