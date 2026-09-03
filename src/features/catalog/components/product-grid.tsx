"use client";

import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { catalogKeys } from "../api/query-keys";
import { getProductsClient } from "../api/get-products-client";
import { ProductCard } from "./product-card";

export function ProductGrid() {
  const searchParams = useSearchParams();
  const query = searchParams.get("busca")?.trim().toLowerCase() ?? "";

  const { data: products = [] } = useQuery({
    queryKey: catalogKeys.list(),
    queryFn: getProductsClient,
    staleTime: 60 * 1000,
  });

  const filtered = query
    ? products.filter((product) => product.name.toLowerCase().includes(query))
    : products;

  if (filtered.length === 0) {
    return (
      <p className="text-neutral-500">
        {query ? `Nenhum produto encontrado para "${query}".` : "Nenhum produto disponível no momento."}
      </p>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {filtered.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
