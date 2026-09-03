import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { hasSession } from "@/shared/lib/backend-client";
import { isSafeRedirectPath } from "@/shared/lib/safe-redirect";
import { IdentificationCard } from "@/features/auth";

export const metadata: Metadata = {
  title: "Entrar | OrderHub Store",
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ redirect?: string }>;
}) {
  if (await hasSession()) {
    redirect("/");
  }

  const { redirect: redirectParam } = await searchParams;
  const redirectTo = isSafeRedirectPath(redirectParam) ? redirectParam : "/";

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6 p-4 sm:p-8">
      <IdentificationCard redirectTo={redirectTo} />
    </div>
  );
}
