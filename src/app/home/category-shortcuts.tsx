import Link from "next/link";

const CATEGORIES = [
  { code: "CE", label: "Celulares" },
  { code: "IN", label: "Informática" },
  { code: "CA", label: "Casa" },
  { code: "EL", label: "Eletro" },
  { code: "MO", label: "Moda" },
  { code: "GA", label: "Games" },
  { code: "BE", label: "Beleza" },
  { code: "FE", label: "Ferramentas" },
];

export function CategoryShortcuts() {
  return (
    <div className="grid grid-cols-4 gap-3 sm:grid-cols-8">
      {CATEGORIES.map((category) => (
        <Link
          key={category.code}
          href="/catalogo"
          className="card-hover-lift flex flex-col items-center gap-2 rounded-card border border-neutral-200 bg-white px-3 py-4 text-center"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-control bg-neutral-100 text-xs font-medium text-neutral-500">
            {category.code}
          </span>
          <span className="text-sm text-neutral-700">{category.label}</span>
        </Link>
      ))}
    </div>
  );
}
