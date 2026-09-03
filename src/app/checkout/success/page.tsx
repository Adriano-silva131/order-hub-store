import type { Metadata } from "next";
import { SuccessContent } from "@/app/checkout/success/success-content";

export const metadata: Metadata = {
  title: "Pagamento confirmado | OrderHub Store",
};

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ orderId?: string }>;
}) {
  const { orderId } = await searchParams;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-neutral-50 p-4">
      <SuccessContent orderId={orderId} />
    </div>
  );
}
