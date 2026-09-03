import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { hasSession } from "@/shared/lib/backend-client";
import { isSafeRedirectPath } from "@/shared/lib/safe-redirect";
import { IdentificationCard } from "@/features/auth";
import { CheckoutHeader } from "@/features/checkout";

export const metadata: Metadata = {
  title: "Identificação | Checkout | OrderHub Store",
};

export default async function CheckoutIdentificationPage({
  searchParams,
}: {
  searchParams: Promise<{ redirect?: string }>;
}) {
  if (await hasSession()) {
    redirect("/checkout/entrega");
  }

  const { redirect: redirectParam } = await searchParams;
  const redirectTo =
    isSafeRedirectPath(redirectParam) && redirectParam.startsWith("/checkout")
      ? redirectParam
      : "/checkout/entrega";

  return (
    <>
      <CheckoutHeader currentStep="identificacao" />
      <div className="flex flex-1 items-start justify-center px-4 py-6 sm:py-12">
        <IdentificationCard
          redirectTo={redirectTo}
          subtitle="Seu carrinho já está salvo. Nova conta ou conta existente, o mesmo campo resolve."
          subtitleShort="Seu carrinho já está salvo."
        />
      </div>
    </>
  );
}
