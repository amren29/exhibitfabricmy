// Standardized Typography System
// Use these consistent class names across all pages

export const typography = {
  // Headings
  h1: 'text-2xl md:text-3xl font-bold',           // Page titles (was 3xl-4xl)
  h2: 'text-xl md:text-2xl font-bold',            // Section titles (was 2xl-3xl)
  h3: 'text-lg md:text-xl font-semibold',         // Subsection titles (was xl-2xl)
  h4: 'text-base font-semibold',                   // Small headings

  // Body Text
  body: 'text-sm',                                 // Default body text (was base)
  bodyLarge: 'text-base',                          // Larger body text (was lg)
  bodySmall: 'text-xs',                            // Small body text (was sm)

  // Special Text
  price: 'text-base md:text-lg font-bold',        // Product prices (was lg-xl)
  priceSmall: 'text-sm font-bold',                // Small prices (was base)
  label: 'text-xs font-medium',                    // Form labels (was sm)
  caption: 'text-xs text-gray-500',               // Captions/hints

  // Buttons
  buttonLarge: 'text-sm font-semibold',           // Large buttons (was base)
  buttonMedium: 'text-xs font-semibold',          // Medium buttons (was sm)
  buttonSmall: 'text-xs font-medium',             // Small buttons

  // Navigation
  nav: 'text-xs font-medium',                      // Nav links (was sm)

  // Product Cards
  productTitle: 'text-sm font-bold',              // Product card titles (was base-lg)
  productDescription: 'text-xs',                   // Product descriptions (was xs-sm)
  productCategory: 'text-xs',                      // Category badges

  // Modal/Dialog
  modalTitle: 'text-xl font-bold',                // Modal titles (was 2xl)
  modalBody: 'text-sm',                           // Modal content (was base)
}

// Helper to combine classes
export const cn = (...classes: string[]) => classes.filter(Boolean).join(' ')
