import { useCartStore } from "../store";

export function useCartSummary() {
  const itemCount = useCartStore((s) => s.items.reduce((sum, i) => sum + i.quantity, 0));
  const totalCents = useCartStore((s) =>
    s.items.reduce((sum, i) => sum + i.priceCents * i.quantity, 0),
  );

  return { itemCount, totalCents };
}
