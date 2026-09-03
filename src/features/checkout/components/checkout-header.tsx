import Link from "next/link";

const STEPS = [
  { key: "identificacao", label: "Identificação" },
  { key: "entrega", label: "Entrega" },
  { key: "pagamento", label: "Pagamento" },
] as const;

export type CheckoutStep = (typeof STEPS)[number]["key"];

const REASSURANCE: Record<CheckoutStep, string> = {
  identificacao: "Compra protegida · seus dados não são compartilhados com o vendedor",
  entrega: "Prazos contados a partir da confirmação do pagamento",
  pagamento: "Compra protegida · seus dados não são compartilhados com o vendedor",
};

export function CheckoutHeader({ currentStep }: { currentStep: CheckoutStep }) {
  const currentIndex = STEPS.findIndex((s) => s.key === currentStep);

  return (
    <header className="border-b border-neutral-200 bg-white px-4 py-3 sm:px-8">
      <div className="mx-auto flex max-w-6xl items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="text-lg font-medium text-neutral-900">
            OrderHub
          </Link>
          <ol className="hidden items-center gap-2 text-sm sm:flex">
            {STEPS.map((step, index) => (
              <li key={step.key} className="flex items-center gap-2">
                {index > 0 && <span className="text-neutral-300">·</span>}
                <span
                  className={
                    index === currentIndex
                      ? "font-medium text-neutral-900"
                      : "text-neutral-400"
                  }
                >
                  {index + 1} {step.label}
                </span>
              </li>
            ))}
          </ol>
        </div>

        <span className="text-sm font-medium text-link-600 sm:hidden">
          Passo {currentIndex + 1} de {STEPS.length}
        </span>

        {/* Secondary reassurance — dropped on mobile, no room for it. */}
        <p className="hidden text-xs text-neutral-500 sm:block">{REASSURANCE[currentStep]}</p>
      </div>
    </header>
  );
}
