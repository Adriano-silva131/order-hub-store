export function PromoBanner() {
  return (
    <div className="flex min-h-24 items-center justify-between gap-4 rounded-card bg-action-900 px-6 py-4 text-white">
      <div>
        <p className="text-base font-medium">Semana de eletro</p>
        <p className="text-sm text-neutral-200">
          <span className="sm:hidden">até 40% off · cupom ELETRO10</span>
          <span className="hidden sm:inline">
            até 40% off em cozinha e limpeza · cupom ELETRO10
          </span>
        </p>
      </div>
    </div>
  );
}
