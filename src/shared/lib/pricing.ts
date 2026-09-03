
export function computeInstallments(
  priceCents: number,
  { max = 12, minInstallmentCents = 500 }: { max?: number; minInstallmentCents?: number } = {},
) {
  const maxByFloor = Math.floor(priceCents / minInstallmentCents);
  const count = Math.max(1, Math.min(max, maxByFloor));
  return { count, amountCents: Math.round(priceCents / count) };
}

export function computePixPrice(priceCents: number, discountPercent = 10) {
  return Math.round(priceCents * (1 - discountPercent / 100));
}
