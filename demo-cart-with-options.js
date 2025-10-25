// Demo script showing cart total calculation with price options

function formatPrice(price) {
  const numericPrice = price.replace(/[^\d.]/g, '');
  if (!numericPrice) return price;
  const formattedNumber = parseFloat(numericPrice).toFixed(2);
  const parts = formattedNumber.split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return `RM ${parts.join('.')}`;
}

function calculateTotalPrice(items) {
  return items.reduce((total, item) => {
    const numericPrice = item.price.replace(/[^\d.]/g, '');
    const price = parseFloat(numericPrice) || 0;
    return total + (price * item.quantity);
  }, 0);
}

console.log('\n🛒 Shopping Cart Demo with Price Options\n');
console.log('='.repeat(70));

// Simulate a cart with different products and options
const cart = [
  {
    id: 'TENSION-90',
    name: 'Tension Stand 90x200',
    category: 'Tension System - Straight',
    price: 'RM 400.00',
    priceOption: 'Double Sided',
    quantity: 2
  },
  {
    id: 'TENSION-90',
    name: 'Tension Stand 90x200',
    category: 'Tension System - Straight',
    price: 'RM 300.00',
    priceOption: 'Single Sided',
    quantity: 1
  },
  {
    id: 'POP-UP-2X3',
    name: 'Pop Up Straight 2x3',
    category: 'Display System',
    price: 'RM 1,500.00',
    priceOption: undefined, // Standard product (no options)
    quantity: 1
  },
  {
    id: 'HARD-CASING',
    name: 'Hard Casing Display',
    category: 'Display System',
    price: 'RM 500.00',
    priceOption: 'With Print',
    quantity: 3
  }
];

console.log('\n📦 Cart Items:\n');

cart.forEach((item, index) => {
  const itemTotal = (parseFloat(item.price.replace(/[^\d.]/g, '')) * item.quantity);
  console.log(`${index + 1}. ${item.name}`);
  if (item.priceOption) {
    console.log(`   Option: ${item.priceOption}`);
  }
  console.log(`   Price: ${item.price} × ${item.quantity} = ${formatPrice(`RM ${itemTotal}`)}`);
  console.log('');
});

const totalPrice = calculateTotalPrice(cart);
const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

console.log('='.repeat(70));
console.log(`\n💰 Order Summary:`);
console.log(`   Total Items: ${totalItems}`);
console.log(`   Total Price: ${formatPrice(`RM ${totalPrice}`)}`);
console.log('\n='.repeat(70));

// Show WhatsApp message preview
console.log('\n📱 WhatsApp Message Preview (for N8N AI):\n');
console.log('*QUOTATION REQUEST*\n');
console.log('[Company Details...]\n');
console.log('*Products Requested:*');
console.log('='.repeat(40) + '\n');

cart.forEach((item, index) => {
  console.log(`*${index + 1}. ${item.name}*`);
  console.log(`   Category: ${item.category}`);
  if (item.priceOption) {
    console.log(`   Option: ${item.priceOption}`);
  }
  console.log(`   Price: ${item.price}`);
  console.log(`   Quantity: ${item.quantity}`);
  console.log('');
});

console.log('='.repeat(40));
console.log(`*Total Items: ${totalItems}*`);
console.log(`*Total Price: ${formatPrice(`RM ${totalPrice}`)}*  ← N8N AI extracts this`);
console.log('\n' + '='.repeat(70));

console.log('\n✓ Demo completed!\n');
console.log('Key Features Demonstrated:');
console.log('  • Products with price options (Single/Double Sided)');
console.log('  • Products with print options (Frame Only/With Print)');
console.log('  • Products with standard pricing');
console.log('  • Total price calculation');
console.log('  • WhatsApp message formatting for N8N AI\n');
