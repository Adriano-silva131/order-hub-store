"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAction } from "next-safe-action/hooks";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { useCartStore, useMergeCartMutation } from "@/features/cart";
import { requestCodeAction, verifyCodeAction } from "../actions";
import {
  requestCodeSchema,
  verifyCodeSchema,
  type RequestCodeInput,
  type VerifyCodeInput,
} from "../schemas";

type Step = "email" | "code";

type Props = {
  redirectTo?: string;
  subtitle?: string;
  subtitleShort?: string;
};

export function IdentificationCard({
  redirectTo = "/",
  subtitle = "Nova conta ou conta existente, o mesmo campo resolve.",
  subtitleShort = "Nova conta ou conta existente.",
}: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const googleError = searchParams.get("error") === "google";
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const cartItems = useCartStore((s) => s.items);
  const mergeCart = useMergeCartMutation();

  const emailForm = useForm<RequestCodeInput>({ resolver: zodResolver(requestCodeSchema) });
  const codeForm = useForm<VerifyCodeInput>({ resolver: zodResolver(verifyCodeSchema) });

  const requestCode = useAction(requestCodeAction, {
    onSuccess: ({ input }) => {
      setEmail(input.email);
      codeForm.setValue("email", input.email);
      setStep("code");
    },
  });

  const verifyCode = useAction(verifyCodeAction, {
    onSuccess: async () => {
      await mergeCart.mutateAsync(cartItems);
      router.push(redirectTo);
    },
  });

  const requestError = requestCode.result.serverError;
  const verifyError = verifyCode.result.serverError;

  return (
    <div className="mx-auto w-full max-w-md bg-white p-4 sm:rounded-card sm:border sm:border-neutral-200 sm:p-6">
      <h1 className="text-xl font-medium text-neutral-900">Identifique-se para continuar</h1>
      <p className="mt-1 text-sm text-neutral-500">
        <span className="sm:hidden">{subtitleShort}</span>
        <span className="hidden sm:inline">{subtitle}</span>
      </p>

      <a
        href={`/api/auth/google?redirect_to=${encodeURIComponent(redirectTo)}`}
        className="mt-6 flex w-full items-center justify-center gap-3 rounded-control border border-neutral-200 py-2.5 text-sm font-medium text-neutral-900 transition-colors duration-[var(--dur-fast)] hover:border-neutral-400"
      >
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-neutral-100 text-xs font-medium text-neutral-500">
          G
        </span>
        Continuar com Google
      </a>
      {googleError && (
        <p role="alert" className="mt-2 text-sm text-danger-600">
          Não foi possível entrar com o Google. Tente novamente.
        </p>
      )}

      <div className="my-6 flex items-center gap-3 text-xs text-neutral-400">
        <div className="h-px flex-1 bg-neutral-200" />
        ou com e-mail
        <div className="h-px flex-1 bg-neutral-200" />
      </div>

      {step === "email" ? (
        <form
          onSubmit={emailForm.handleSubmit((data) => requestCode.execute(data))}
          className="flex flex-col gap-4"
        >
          <div>
            <Input
              id="email"
              label="E-mail"
              type="email"
              autoComplete="email"
              placeholder="voce@email.com"
              error={emailForm.formState.errors.email?.message}
              {...emailForm.register("email")}
            />
            <p className="mt-2 text-xs text-neutral-500">
              <span className="sm:hidden">Código de 6 dígitos, sem senha.</span>
              <span className="hidden sm:inline">
                Enviamos um código de 6 dígitos. Sem senha, sem &ldquo;esqueci minha senha&rdquo;.
              </span>
            </p>
          </div>

          {requestError && (
            <p role="alert" className="text-sm text-danger-600">
              {requestError}
            </p>
          )}

          <Button type="submit" disabled={requestCode.isExecuting}>
            {requestCode.isExecuting ? "Enviando..." : "Continuar"}
          </Button>
        </form>
      ) : (
        <form
          onSubmit={codeForm.handleSubmit((data) => verifyCode.execute(data))}
          className="flex flex-col gap-4"
        >
          <div>
            <p className="text-sm text-neutral-700">
              Código enviado para <span className="font-medium">{email}</span>.{" "}
              <button
                type="button"
                onClick={() => setStep("email")}
                className="text-link-600 hover:underline"
              >
                Trocar e-mail
              </button>
            </p>
            <input type="hidden" {...codeForm.register("email")} />
            <div className="mt-3">
              <Input
                id="code"
                label="Código de 6 dígitos"
                inputMode="numeric"
                autoComplete="one-time-code"
                maxLength={6}
                error={codeForm.formState.errors.code?.message}
                {...codeForm.register("code")}
              />
            </div>
          </div>

          {verifyError && (
            <p role="alert" className="text-sm text-danger-600">
              {verifyError}
            </p>
          )}

          <Button type="submit" disabled={verifyCode.isExecuting}>
            {verifyCode.isExecuting ? "Confirmando..." : "Continuar"}
          </Button>

          <button
            type="button"
            onClick={() => requestCode.execute({ email })}
            disabled={requestCode.isExecuting}
            className="text-sm text-link-600 hover:underline disabled:opacity-50"
          >
            Reenviar código
          </button>
        </form>
      )}

      <label className="mt-4 flex items-start gap-2 text-sm text-neutral-500">
        <input type="checkbox" className="mt-0.5" defaultChecked={false} />
        Quero receber ofertas e novidades por e-mail.
      </label>

      <p className="mt-3 text-xs text-neutral-400">
        Ao continuar você aceita os{" "}
        <a href="/termos" className="text-link-600 hover:underline">
          Termos de uso
        </a>{" "}
        e a{" "}
        <a href="/privacidade" className="text-link-600 hover:underline">
          Política de privacidade
        </a>
        .
      </p>
    </div>
  );
}
