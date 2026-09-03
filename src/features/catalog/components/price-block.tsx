import { formatMoney } from "@/shared/lib/format-money";
import { Badge } from "@/shared/ui/badge";

type Props = {
  priceCents: number;
  originalPriceCents?: number;
  installments?: { count: number; amountCents: number } | null;
  pixPriceCents?: number | null;
  pixDiscountPercent?: number | null;
};

export function PriceBlock({
  priceCents,
  originalPriceCents,
  installments,
  pixPriceCents,
  pixDiscountPercent,
}: Props) {
  const hasDiscount = originalPriceCents != null && originalPriceCents > priceCents;
  const discountPercent = hasDiscount
    ? Math.round((1 - priceCents / originalPriceCents) * 100)
    : null;

  return (
    <div className="flex flex-col gap-1">
      {hasDiscount && (
        <span className="text-sm tabular-nums text-neutral-400 line-through">
          {formatMoney(originalPriceCents)}
        </span>
      )}

      <div className="flex items-center gap-2">
        <span className="text-lg font-medium tabular-nums text-neutral-900">
          {formatMoney(priceCents)}
        </span>
        {discountPercent !== null && discountPercent > 0 && (
          <Badge variant="success">-{discountPercent}%</Badge>
        )}
      </div>

      {installments && installments.count > 1 && (
        <p className="text-sm tabular-nums text-success-600">
          {installments.count}x {formatMoney(installments.amountCents)} sem juros
        </p>
      )}

      {pixPriceCents != null && (
        <div className="mt-1 w-full rounded-control bg-neutral-50 px-1.5 py-1 text-xs tabular-nums text-neutral-900">
          {formatMoney(pixPriceCents)} no Pix
          {pixDiscountPercent ? (
            <span className="text-neutral-500"> ({pixDiscountPercent}% off)</span>
          ) : null}
        </div>
      )}
    </div>
  );
}
