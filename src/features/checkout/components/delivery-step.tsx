"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAction } from "next-safe-action/hooks";
import { formatMoney } from "@/shared/lib/format-money";
import { Button } from "@/shared/ui/button";
import { useCartStore } from "@/features/cart";
import { createOrderAction } from "@/features/orders";
import { AddressForm } from "./address-form";
import { OrderSummary } from "./order-summary";
import type { AddressInput } from "../schemas";

function addDays(days: number) {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date;
}

function formatDeliveryDate(date: Date) {
  const weekday = date.toLocaleDateString("pt-BR", { weekday: "long" }).replace("-feira", "");
  const month = date.toLocaleDateString("pt-BR", { month: "long" });
  return `${weekday}, ${date.getDate()} de ${month}`;
}

const SHIPPING_OPTIONS = [
  {
    id: "full",
    label: "Full — enviado pelo OrderHub",
    eta: `chega ${formatDeliveryDate(addDays(2))}`,
    priceCents: 0,
  },
  {
    id: "padrao",
    label: "Padrão — enviado pelo vendedor",
    eta: `chega entre ${addDays(7).getDate()} e ${addDays(10).getDate()} de ${addDays(10).toLocaleDateString("pt-BR", { month: "long" })}`,
    priceCents: 0,
  },
  {
    id: "expressa",
    label: "Expressa — entrega amanhã",
    eta: "peça até as 20h de hoje",
    priceCents: 2490,
  },
  {
    id: "retirar",
    label: "Retirar em ponto próximo",
    eta: `Loja Pinheiros · 900 m · a partir de ${formatDeliveryDate(addDays(4))}`,
    priceCents: 0,
  },
];

export function DeliveryStep() {
  const router = useRouter();
  const [address, setAddress] = useState<AddressInput | null>(null);
  const [editingAddress, setEditingAddress] = useState(true);
  const [shippingId, setShippingId] = useState(SHIPPING_OPTIONS[0].id);
  const items = useCartStore((s) => s.items);

  const saveAddress = (data: AddressInput) => {
    setAddress(data);
    setEditingAddress(false);
  };

  const shipping = SHIPPING_OPTIONS.find((option) => option.id === shippingId) ?? SHIPPING_OPTIONS[0];

  const createOrder = useAction(createOrderAction, {
    onSuccess: ({ data }) => {
      router.push(`/checkout/pagamento?orderId=${data.id}`);
    },
  });

  const orderError = createOrder.result.serverError;

  return (
    <div className="mx-auto grid w-full max-w-5xl grid-cols-1 gap-6 lg:grid-cols-[1fr_360px]">
      <div className="flex flex-col gap-6">
        <section className="rounded-card border border-neutral-200 bg-white p-6">
          <h2 className="text-lg font-medium text-neutral-900">Endereço de entrega</h2>

          {!address || editingAddress ? (
            <div className="mt-4">
              <AddressForm defaultValues={address ?? undefined} onSave={saveAddress} />
            </div>
          ) : (
            <div className="mt-4 flex items-start justify-between gap-4 rounded-control border border-neutral-900 p-4">
              <div>
                <p className="text-sm font-medium text-neutral-900">{address.recipient}</p>
                <p className="text-sm text-neutral-700">
                  {address.street}, {address.number}
                  {address.complement ? ` — ${address.complement}` : ""}
                </p>
                <p className="text-sm text-neutral-700">
                  {address.neighborhood}, {address.city} · {address.state} · {address.zip}
                </p>
                <p className="mt-1 text-xs text-neutral-500">{address.phone}</p>
              </div>
              <button
                type="button"
                onClick={() => setEditingAddress(true)}
                className="shrink-0 text-sm text-link-600 hover:underline"
              >
                editar
              </button>
            </div>
          )}
        </section>

        <section className="rounded-card border border-neutral-200 bg-white p-6">
          <h2 className="text-lg font-medium text-neutral-900">Forma de envio</h2>
          <div className="mt-4 flex flex-col gap-3">
            {SHIPPING_OPTIONS.map((option) => (
              <label
                key={option.id}
                className={`flex cursor-pointer items-center justify-between gap-4 rounded-control border p-4 transition-colors duration-[var(--dur-fast)] ${
                  shippingId === option.id ? "border-neutral-900" : "border-neutral-200"
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="shipping"
                    checked={shippingId === option.id}
                    onChange={() => setShippingId(option.id)}
                  />
                  <div>
                    <p className="text-sm font-medium text-neutral-900">{option.label}</p>
                    <p className="text-sm text-neutral-500">{option.eta}</p>
                  </div>
                </div>
                <span className="shrink-0 text-sm font-medium tabular-nums text-success-600">
                  {option.priceCents === 0 ? "grátis" : formatMoney(option.priceCents)}
                </span>
              </label>
            ))}
          </div>
        </section>
      </div>

      <OrderSummary
        shippingLabel={shipping.priceCents === 0 ? "grátis" : formatMoney(shipping.priceCents)}
        shippingCents={shipping.priceCents}
        footer={
          <>
            <p className="mt-1 text-xs text-neutral-500">
              {shipping.eta[0].toUpperCase() + shipping.eta.slice(1)}
            </p>

            {orderError && (
              <p role="alert" className="mt-2 text-sm text-danger-600">
                {orderError}
              </p>
            )}

            <Button
              onClick={() =>
                createOrder.execute({
                  items: items.map((item) => ({ productId: item.productId, quantity: item.quantity })),
                })
              }
              disabled={items.length === 0 || !address || createOrder.isExecuting}
              className="mt-4 w-full"
            >
              {createOrder.isExecuting ? "Criando pedido..." : "Continuar para pagamento"}
            </Button>
          </>
        }
      />
    </div>
  );
}
