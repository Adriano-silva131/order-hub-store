"use client";

import Link from "next/link";
import { formatMoney } from "@/shared/lib/format-money";
import { computePixPrice } from "@/shared/lib/pricing";
import { Button } from "@/shared/ui/button";
import { useCartStore, useCartSummary } from "@/features/cart";
import { CartItemRow } from "./cart-item-row";

export function CartDrawer() {
  const isOpen = useCartStore((s) => s.isOpen);
  const close = useCartStore((s) => s.close);
  const items = useCartStore((s) => s.items);
  const { itemCount, totalCents } = useCartSummary();
  const pixTotalCents = computePixPrice(totalCents);

  return (
    <div
      className={`fixed inset-0 z-50 flex justify-end ${isOpen ? "" : "pointer-events-none"}`}
      aria-hidden={!isOpen}
    >
      <button
        type="button"
        aria-label="Fechar carrinho"
        onClick={close}
        tabIndex={isOpen ? 0 : -1}
        className={`absolute inset-0 bg-neutral-900/40 transition-opacity duration-[var(--dur-slow)] ease-out ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
      />
      <div
        className={`relative flex h-full w-full max-w-sm flex-col bg-white p-6 shadow-xl transition-transform duration-[var(--dur-slow)] ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-medium text-neutral-900">
            Carrinho{itemCount > 0 ? ` (${itemCount})` : ""}
          </h2>
          <button
            type="button"
            onClick={close}
            tabIndex={isOpen ? 0 : -1}
            aria-label="Fechar"
            className="text-xl text-neutral-500"
          >
            ×
          </button>
        </div>

        {items.length === 0 ? (
          <p className="mt-6 text-sm text-neutral-500">Seu carrinho está vazio.</p>
        ) : (
          <ul className="mt-4 flex-1 divide-y divide-neutral-200 overflow-y-auto">
            {items.map((item) => (
              <CartItemRow key={item.productId} item={item} />
            ))}
          </ul>
        )}

        {items.length > 0 && (
          <div className="mt-4 flex flex-col gap-2 border-t border-neutral-200 pt-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-neutral-500">Subtotal</span>
              <span className="font-medium tabular-nums text-neutral-900">
                {formatMoney(totalCents)}
              </span>
            </div>
            <p className="text-sm tabular-nums text-success-600">
              {formatMoney(pixTotalCents)} pagando no Pix (10% off)
            </p>
            <Link href="/checkout" onClick={close} tabIndex={isOpen ? 0 : -1} className="mt-2">
              <Button className="w-full">Fechar pedido</Button>
            </Link>
            <p className="text-center text-xs text-link-600">
              Login só no primeiro passo do checkout
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
