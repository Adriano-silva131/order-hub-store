import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/shared/ui/button";

export const metadata: Metadata = {
  title: "Pagamento cancelado | OrderHub Store",
};

export default async function CheckoutCancelPage({
  searchParams,
}: {
  searchParams: Promise<{ orderId?: string }>;
}) {
  const { orderId } = await searchParams;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-neutral-50 p-4">
      <div className="w-full max-w-md rounded-card border border-neutral-200 bg-white p-6 text-center">
        <h1 className="text-xl font-medium text-neutral-900">Pagamento não concluído</h1>
        <p className="mt-2 text-sm text-neutral-500">
          Seu pedido continua pendente — nada foi cobrado. Você pode tentar novamente quando quiser.
        </p>
        {orderId && (
          <Link href={`/checkout/pagamento?orderId=${orderId}`}>
            <Button className="mt-4 w-full">Tentar pagamento novamente</Button>
          </Link>
        )}
      </div>
    </div>
  );
}
