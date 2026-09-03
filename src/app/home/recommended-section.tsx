import { ProductCard, type Product } from "@/features/catalog";

export function RecommendedSection({ products }: { products: Product[] }) {
  if (products.length === 0) return null;

  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-xl font-medium text-neutral-900">Outros produtos</h2>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
