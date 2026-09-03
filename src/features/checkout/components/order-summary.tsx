"use client";

import { formatMoney } from "@/shared/lib/format-money";
import { useCartStore, useCartSummary } from "@/features/cart";

type Props = {
  shippingLabel?: string;
  shippingCents?: number;
  footer?: React.ReactNode;
};

export function OrderSummary({ shippingLabel, shippingCents = 0, footer }: Props) {
  const items = useCartStore((s) => s.items);
  const { totalCents } = useCartSummary();
  const grandTotalCents = totalCents + shippingCents;

  return (
    <aside className="h-fit rounded-card border border-neutral-200 bg-white p-6">
      <h2 className="text-lg font-medium text-neutral-900">Resumo do pedido</h2>

      {items.length === 0 ? (
        <p className="mt-4 text-sm text-neutral-500">Seu carrinho está vazio.</p>
      ) : (
        <ul className="mt-4 flex flex-col gap-3">
          {items.map((item) => (
            <li key={item.productId} className="flex gap-3">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-control bg-neutral-50 text-[10px] text-neutral-400">
                foto
              </div>
              <div className="flex flex-1 flex-col">
                <p className="line-clamp-2 text-sm text-neutral-900">{item.name}</p>
                <p className="text-xs text-neutral-500">{item.quantity} un.</p>
              </div>
              <span className="shrink-0 text-sm tabular-nums text-neutral-900">
                {formatMoney(item.priceCents * item.quantity)}
              </span>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-4 flex flex-col gap-2 border-t border-neutral-200 pt-4 text-sm">
        <div className="flex justify-between">
          <span className="text-neutral-500">Subtotal</span>
          <span className="tabular-nums text-neutral-900">{formatMoney(totalCents)}</span>
        </div>
        {shippingLabel && (
          <div className="flex justify-between">
            <span className="text-neutral-500">Frete</span>
            <span className="tabular-nums text-success-600">{shippingLabel}</span>
          </div>
        )}
      </div>

      <div className="mt-2 flex items-center justify-between border-t border-neutral-200 pt-2">
        <span className="font-medium text-neutral-900">Total</span>
        <span className="text-lg font-medium tabular-nums text-neutral-900">
          {formatMoney(grandTotalCents)}
        </span>
      </div>

      {footer}
    </aside>
  );
}
