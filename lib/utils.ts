import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: string): string {
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

export interface PriceOption {
  label: string;
  value: string;
  numericValue: number;
}

export function parsePriceOptions(priceString: string): PriceOption[] {
  const options: PriceOption[] = [];

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

export function calculateTotalPrice(items: Array<{ price: string; quantity: number }>): number {
  return items.reduce((total, item) => {
    const numericPrice = item.price.replace(/[^\d.]/g, '');
    const price = parseFloat(numericPrice) || 0;
    return total + (price * item.quantity);
  }, 0);
}
