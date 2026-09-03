import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { hasSession } from "@/shared/lib/backend-client";
import { CheckoutHeader, PaymentStep } from "@/features/checkout";

export const metadata: Metadata = {
  title: "Pagamento | Checkout | OrderHub Store",
};

export default async function CheckoutPaymentPage({
  searchParams,
}: {
  searchParams: Promise<{ orderId?: string }>;
}) {
  if (!(await hasSession())) {
    redirect("/checkout?redirect=/checkout/pagamento");
  }

  const { orderId } = await searchParams;
  if (!orderId) {
    redirect("/checkout/entrega");
  }

  return (
    <>
      <CheckoutHeader currentStep="pagamento" />
      <div className="flex flex-1 items-start justify-center px-4 py-6 sm:py-12">
        <PaymentStep orderId={orderId} />
      </div>
    </>
  );
}
