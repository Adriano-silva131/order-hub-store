"use client";

import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CartTrigger } from "@/features/cart";

const DEPARTMENT_LINKS = [
  { label: "Ofertas", href: "/catalogo" },
  { label: "Mais vendidos", href: "/catalogo" },
  { label: "Categorias", href: "/catalogo" },
  { label: "Cupons", href: "/catalogo" },
  { label: "Lojas oficiais", href: "/catalogo" },
];

type Props = {
  loggedIn: boolean;
  logoutSlot: ReactNode;
};

export function NavbarShell({ loggedIn, logoutSlot }: Props) {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const query = new FormData(event.currentTarget).get("busca");
    const params = query ? `?busca=${encodeURIComponent(String(query))}` : "";
    router.push(`/catalogo${params}`);
  };

  return (
    <header className={`sticky top-0 z-40 bg-white ${scrolled ? "shadow-sm" : ""}`}>
      {/* Tier 1 — utilities. Hidden below sm (no room, and the reference
          mobile layout doesn't show it at all); collapses on scroll from sm up. */}
      <div
        className={`hidden overflow-hidden bg-neutral-50 transition-[grid-template-rows] duration-[var(--dur-slow)] ease-out sm:grid ${
          scrolled ? "sm:grid-rows-[0fr]" : "sm:grid-rows-[1fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-8 py-1.5 text-xs text-neutral-500">
            <span>Frete grátis acima de R$ 199 em produtos selecionados</span>
            <div className="flex items-center gap-4">
              <Link href="/vender" className="text-link-600 hover:underline">
                Vender no OrderHub
              </Link>
              <Link href="/ajuda" className="text-link-600 hover:underline">
                Ajuda
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Tier 2 — main. Never collapses: search and cart must always be
          reachable. Mobile: logo+entrar+carrinho on one row, search on its
          own full-width row below. sm+: a single row, in that same visual
          order (logo, search, entrar/carrinho), via the `contents` + `order`
          combo so the DOM doesn't need to duplicate any element. */}
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:gap-6 sm:px-8 sm:py-4">
        <div className="flex items-center justify-between sm:contents">
          <Link href="/" className="shrink-0 text-xl font-medium text-neutral-900 sm:order-1">
            OrderHub
          </Link>

          <div className="flex shrink-0 items-center gap-4 sm:order-3">
            {loggedIn ? logoutSlot : (
              <Link href="/login" className="text-sm font-medium text-link-600">
                Entrar
              </Link>
            )}
            <CartTrigger />
          </div>
        </div>

        <form onSubmit={handleSearch} className="flex sm:order-2 sm:flex-1">
          <input
            type="search"
            name="busca"
            placeholder="Buscar produtos, marcas e categorias"
            className="w-full rounded-control border border-neutral-200 px-4 py-2 text-sm text-neutral-900 focus:border-link-600 focus:outline-none focus:ring-2 focus:ring-link-600/20"
          />
        </form>
      </div>

      {/* Tier 3 — departments. Hidden below sm, same reasoning as Tier 1. */}
      <div
        className={`hidden overflow-hidden transition-[grid-template-rows] duration-[var(--dur-slow)] ease-out sm:grid ${
          scrolled ? "sm:grid-rows-[0fr]" : "sm:grid-rows-[1fr]"
        }`}
      >
        <div className="overflow-hidden border-t border-neutral-200">
          <nav className="mx-auto flex max-w-6xl items-center gap-6 px-8 py-2.5 text-sm text-neutral-700">
            <Link href="/catalogo" className="font-medium">
              Departamentos
            </Link>
            {DEPARTMENT_LINKS.map((item) => (
              <Link key={item.label} href={item.href} className="hover:underline">
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
