"use client";

import { formatMoney } from "@/shared/lib/format-money";
import { useCartStore } from "../store";
import type { CartItem } from "../types";

export function CartItemRow({ item }: { item: CartItem }) {
  const setQuantity = useCartStore((s) => s.setQuantity);
  const removeItem = useCartStore((s) => s.removeItem);

  return (
    <li className="flex gap-3 py-4">
      <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-control bg-neutral-50 text-[10px] text-neutral-400">
        foto
      </div>

      <div className="flex flex-1 flex-col gap-2">
        <p className="line-clamp-2 text-sm text-neutral-900">{item.name}</p>

        <div className="flex items-center gap-3">
          <div className="flex items-center rounded-control border border-neutral-200">
            <button
              type="button"
              onClick={() => setQuantity(item.productId, item.quantity - 1)}
              aria-label={`Diminuir quantidade de ${item.name}`}
              className="px-2 py-1 text-sm text-neutral-700"
            >
              −
            </button>
            <span className="min-w-6 px-1 text-center text-sm tabular-nums text-neutral-900">
              {item.quantity}
            </span>
            <button
              type="button"
              onClick={() => setQuantity(item.productId, item.quantity + 1)}
              aria-label={`Aumentar quantidade de ${item.name}`}
              className="px-2 py-1 text-sm text-neutral-700"
            >
              +
            </button>
          </div>
          <button
            type="button"
            onClick={() => removeItem(item.productId)}
            className="text-sm text-link-600 underline"
          >
            remover
          </button>
        </div>
      </div>

      <span className="shrink-0 text-sm tabular-nums text-neutral-900">
        {formatMoney(item.priceCents * item.quantity)}
      </span>
    </li>
  );
}
