import { Navbar } from "@/app/layouts/navbar";
import { CartDrawer } from "@/features/cart";

export default function StoreLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="flex flex-1 flex-col">{children}</main>
      <CartDrawer />
    </>
  );
}
