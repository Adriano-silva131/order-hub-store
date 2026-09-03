import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { hasSession } from "@/shared/lib/backend-client";
import { CheckoutHeader, DeliveryStep } from "@/features/checkout";

export const metadata: Metadata = {
  title: "Entrega | Checkout | OrderHub Store",
};

export default async function CheckoutDeliveryPage() {
  if (!(await hasSession())) {
    redirect("/checkout");
  }

  return (
    <>
      <CheckoutHeader currentStep="entrega" />
      <div className="flex flex-1 items-start justify-center px-4 py-6 sm:py-12">
        <DeliveryStep />
      </div>
    </>
  );
}
