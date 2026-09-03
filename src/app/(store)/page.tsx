import { getProducts } from "@/features/catalog/api/get-products";
import { CategoryShortcuts } from "@/app/home/category-shortcuts";
import { PromoBanner } from "@/app/home/promo-banner";
import { DailyDealsSection } from "@/app/home/daily-deals-section";
import { RecommendedSection } from "@/app/home/recommended-section";

export default async function HomePage() {
  const products = await getProducts();
  const dailyDeals = products.slice(0, 5);
  const rest = products.slice(5, 10);

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-6 sm:px-8">
      <CategoryShortcuts />
      <PromoBanner />
      <DailyDealsSection products={dailyDeals} />
      <RecommendedSection products={rest} />
    </div>
  );
}
