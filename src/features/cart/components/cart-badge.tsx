"use client";

import { useEffect, useRef, useState } from "react";
import { useCartSummary } from "@/features/cart";

export function CartBadge() {
  const { itemCount } = useCartSummary();
  const previousCount = useRef(itemCount);
  const [pulseKey, setPulseKey] = useState(0);

  useEffect(() => {
    if (itemCount > previousCount.current) {
      setPulseKey((key) => key + 1);
    }
    previousCount.current = itemCount;
  }, [itemCount]);

  return (
    <span className="inline-flex items-center gap-2 text-sm font-medium text-neutral-900">
      Carrinho
      {itemCount > 0 && (
        <span
          key={pulseKey}
          className="cart-pulse flex h-5 min-w-5 items-center justify-center rounded-full bg-action-900 px-1 text-xs tabular-nums text-white"
        >
          {itemCount}
        </span>
      )}
    </span>
  );
}
