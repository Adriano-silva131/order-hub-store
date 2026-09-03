"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/shared/ui/button";
import { useCartStore } from "@/features/cart";

export function SuccessContent({ orderId }: { orderId?: string }) {
  const clear = useCartStore((s) => s.clear);

  useEffect(() => {
    clear();
  }, [clear]);

  return (
    <div className="w-full max-w-md rounded-card border border-neutral-200 bg-white p-6 text-center">
      <h1 className="text-xl font-medium text-neutral-900">Pagamento recebido</h1>
      <p className="mt-2 text-sm text-neutral-500">
        {orderId && (
          <>
            Seu pedido <span className="font-medium text-neutral-700">#{orderId.slice(0, 8)}</span>{" "}
          </>
        )}
        está sendo processado. Você vai receber uma confirmação assim que o pagamento for aprovado.
      </p>
      <Link href="/">
        <Button className="mt-4 w-full">Voltar para a loja</Button>
      </Link>
    </div>
  );
}
