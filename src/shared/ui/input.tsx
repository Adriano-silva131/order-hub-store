import { type InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
};

export function Input({ label, error, id, className = "", ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-sm font-medium text-neutral-700">
        {label}
      </label>
      <input
        id={id}
        className={`rounded-control border border-neutral-200 px-3 py-2 text-sm text-neutral-900 focus:border-link-600 focus:outline-none focus:ring-2 focus:ring-link-600/20 ${className}`}
        aria-invalid={Boolean(error)}
        {...props}
      />
      {error && (
        <p role="alert" className="text-sm text-danger-600">
          {error}
        </p>
      )}
    </div>
  );
}
