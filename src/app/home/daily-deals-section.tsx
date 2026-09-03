import Link from "next/link";
import { ProductCard, type Product } from "@/features/catalog";
import { Countdown } from "@/shared/ui/countdown";

export function DailyDealsSection({ products }: { products: Product[] }) {
  if (products.length === 0) return null;

  return (
    <section className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="flex items-center gap-3 text-xl font-medium text-neutral-900">
          Ofertas do dia
          <span className="text-sm font-normal text-danger-600">
            <Countdown />
          </span>
        </h2>
        <Link href="/catalogo" className="text-sm font-medium text-link-600">
          Ver todas
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            badge={
              product.stockQuantity > 0 && product.stockQuantity < 10
                ? { label: `Últimas ${product.stockQuantity}`, variant: "danger" }
                : { label: "Oferta do dia", variant: "danger" }
            }
          />
        ))}
      </div>
    </section>
  );
}
