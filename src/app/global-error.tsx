"use client"; // Error boundaries must be Client Components

export default function GlobalError({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  return (
    <html lang="pt-BR">
      <body>
        <div className="flex min-h-screen flex-col items-center justify-center gap-4 p-8 text-center">
          <h2 className="text-xl font-medium text-neutral-900">Algo deu errado.</h2>
          <p className="text-sm text-neutral-500">{error.message}</p>
          <button
            onClick={() => retry()}
            className="rounded-control bg-action-900 px-4 py-2 text-white"
          >
            Tentar novamente
          </button>
        </div>
      </body>
    </html>
  );
}
