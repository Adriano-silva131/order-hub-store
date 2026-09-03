"use client";

import { Button } from "@/shared/ui/button";
import { useCartStore } from "@/features/cart";

type Props = {
  productId: string;
  name: string;
  priceCents: number;
  disabled?: boolean;
};

export function AddToCartButton({ productId, name, priceCents, disabled }: Props) {
  const addItem = useCartStore((s) => s.addItem);

  return (
    <Button
      type="button"
      disabled={disabled}
      onClick={() => addItem({ productId, name, priceCents })}
      className="w-full"
    >
      {disabled ? (
        "Esgotado"
      ) : (
        <>
          <span className="sm:hidden">Adicionar</span>
          <span className="hidden sm:inline">Adicionar ao carrinho</span>
        </>
      )}
    </Button>
  );
}
