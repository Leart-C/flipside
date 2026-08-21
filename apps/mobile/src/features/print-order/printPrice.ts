export const previewUnitPriceInCents = 240;

export function calculatePreviewPriceInCents(quantity: number) {
  return previewUnitPriceInCents * quantity;
}

export function formatPrice(priceInCents: number) {
  return `$${(priceInCents / 100).toFixed(2)}`;
}
