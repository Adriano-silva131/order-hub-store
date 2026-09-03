import type { Metadata } from "next";
import { Suspense } from "react";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { catalogKeys, ProductGrid } from "@/features/catalog";
import { getProducts } from "@/features/catalog/api/get-products";

export const metadata: Metadata = {
  title: "Catálogo | OrderHub Store",
  description: "Todos os produtos disponíveis na loja OrderHub.",
};

export default async function CatalogPage() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: catalogKeys.list(),
    queryFn: getProducts,
  });

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-6 sm:px-8">
      <h1 className="text-2xl font-medium text-neutral-900">Catálogo</h1>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense>
          <ProductGrid />
        </Suspense>
      </HydrationBoundary>
    </div>
  );
}
