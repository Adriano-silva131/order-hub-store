"use client";

import { useState } from "react";
import { useAction } from "next-safe-action/hooks";
import { formatMoney } from "@/shared/lib/format-money";
import { Button } from "@/shared/ui/button";
import { useCartSummary } from "@/features/cart";
import { startPaymentCheckoutAction, PAYMENT_METHODS, type PaymentOption } from "@/features/payments";
import { OrderSummary } from "./order-summary";

const PAYMENT_OPTIONS: { id: PaymentOption; label: string }[] = [
  { id: "cartao", label: "Cartão" },
  { id: "pix", label: "Pix" },
  { id: "boleto", label: "Boleto" },
];

export function PaymentStep({ orderId }: { orderId: string }) {
  const [selected, setSelected] = useState<PaymentOption>("cartao");
  const { totalCents } = useCartSummary();

  const startCheckout = useAction(startPaymentCheckoutAction, {
    onSuccess: ({ data }) => {
      window.location.href = data.checkoutUrl;
    },
  });

  const checkoutError = startCheckout.result.serverError;

  const gatewayName = PAYMENT_METHODS[selected] === "STRIPE" ? "Stripe" : "Mercado Pago";

  return (
    <div className="mx-auto grid w-full max-w-5xl grid-cols-1 gap-6 lg:grid-cols-[1fr_360px]">
      <section className="flex flex-col gap-4 rounded-card border border-neutral-200 bg-white p-6">
        <h2 className="text-lg font-medium text-neutral-900">Pagamento</h2>

        <div className="grid grid-cols-3 gap-3">
          {PAYMENT_OPTIONS.map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() => setSelected(option.id)}
              className={`rounded-control border px-4 py-2.5 text-sm font-medium transition-colors duration-[var(--dur-fast)] ${
                selected === option.id
                  ? "border-neutral-900 text-neutral-900"
                  : "border-neutral-200 text-neutral-500 hover:border-neutral-400"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>

        <p className="rounded-control bg-neutral-50 p-4 text-sm text-neutral-500">
          Você será redirecionado com segurança para concluir o pagamento pelo{" "}
          {gatewayName}. Nenhum dado sensível passa por este site.
        </p>

        {checkoutError && (
          <p role="alert" className="text-sm text-danger-600">
            {checkoutError}
          </p>
        )}

        <Button
          onClick={() => startCheckout.execute({ orderId, paymentMethod: PAYMENT_METHODS[selected] })}
          disabled={startCheckout.isExecuting}
          className="w-full"
        >
          {startCheckout.isExecuting ? "Preparando pagamento..." : `Pagar ${formatMoney(totalCents)}`}
        </Button>

        <p className="text-center text-xs text-neutral-400">
          Ao pagar você aceita os{" "}
          <a href="/termos" className="text-link-600 hover:underline">
            Termos de uso
          </a>
          .
        </p>
      </section>

      <OrderSummary />
    </div>
  );
}
