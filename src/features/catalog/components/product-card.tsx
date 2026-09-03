import { computeInstallments, computePixPrice } from "@/shared/lib/pricing";
import { Badge } from "@/shared/ui/badge";
import type { Product } from "../schemas";
import { PriceBlock } from "./price-block";
import { AddToCartButton } from "./add-to-cart-button";

type Props = {
  product: Product;
  badge?: { label: string; variant?: "neutral" | "danger" | "success" | "warning" };
};

export function ProductCard({ product, badge }: Props) {
  const installments = computeInstallments(product.priceCents);
  const pixPriceCents = computePixPrice(product.priceCents);

  return (
    <article className="card card-hover-lift flex h-full flex-col gap-3 rounded-card border border-neutral-200 bg-white p-3">
      <div className="relative aspect-square overflow-hidden rounded-control bg-neutral-50">
        {badge && (
          <Badge variant={badge.variant} className="absolute left-2 top-2">
            {badge.label}
          </Badge>
        )}
        <div className="flex h-full items-center justify-center text-xs text-neutral-400">
          FOTO 1:1
        </div>
      </div>

      <h3 className="line-clamp-2 text-sm font-normal text-neutral-700">{product.name}</h3>

      <PriceBlock
        priceCents={product.priceCents}
        installments={installments.count > 1 ? installments : null}
        pixPriceCents={pixPriceCents}
        pixDiscountPercent={10}
      />

      <div className="card-cta mt-auto">
        <AddToCartButton
          productId={product.id}
          name={product.name}
          priceCents={product.priceCents}
          disabled={product.stockQuantity <= 0}
        />
      </div>
    </article>
  );
}
