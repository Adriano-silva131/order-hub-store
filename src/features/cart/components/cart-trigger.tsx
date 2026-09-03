"use client";

import { useCartStore } from "../store";
import { CartBadge } from "./cart-badge";

export function CartTrigger() {
  const open = useCartStore((s) => s.open);

  return (
    <button type="button" onClick={open} aria-label="Abrir carrinho">
      <CartBadge />
    </button>
  );
}
