import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "@/app/layouts/providers";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "OrderHub Store",
  description: "Loja do OrderHub",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans text-base text-neutral-900">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
